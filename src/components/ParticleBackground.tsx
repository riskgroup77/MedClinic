import { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  scrollProgress: number; // 0 to 1 representing position
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  depth: number; // 3D simulated depth layer
}

export default function ParticleBackground({ scrollProgress }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 40 : 120;

    const colors = [
      "rgba(0, 102, 255, ", // Neon Blue
      "rgba(0, 200, 255, ", // Cyan
      "rgba(0, 255, 153, ", // Health Green
      "rgba(139, 92, 246, " // Deep Purple
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 3.5 + 0.5;
        const depth = Math.random() * 1.5 + 0.5; // Controls distance multiplier
        
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: size * depth,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.6 + 0.15,
          depth
        });
      }
    };

    // Track mouse coordinates for subtle magnetic attraction
    const mouse = { x: -1000, y: -1000, radius: 140 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render the grid background mimicking 3D digital horizon
      ctx.strokeStyle = "rgba(0, 102, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      const gridOffset = (scrollProgress * 250) % gridSize;

      // Vertical lines
      for (let x = gridOffset; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      // Horizontal lines with scroll distortion
      for (let y = (gridOffset * 0.5) % gridSize; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Render particle flows
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply 3D parallax scroll coordinates
        // Phase-specific displacement vectors
        const scrollOffset = scrollProgress * 400 * p.depth;
        let targetY = p.baseY - scrollOffset;
        
        // Loop particles that slide out of boundaries
        if (targetY < -50) {
          p.baseY += canvas.height + 100;
        } else if (targetY > canvas.height + 50) {
          p.baseY -= canvas.height + 100;
        }

        // Speed update
        p.x += p.speedX;
        p.baseY += p.speedY; // move the baseline organically

        // Calculate actual relative Y position
        const currentY = p.baseY - scrollOffset;

        // Apply mouse proximity force fields
        const dx = mouse.x - p.x;
        const dy = mouse.y - currentY;
        const dist = Math.hypot(dx, dy);

        let finalX = p.x;
        let finalY = currentY;

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const forceDirectionX = dx / dist;
          const forceDirectionY = dy / dist;
          // Drags molecular structure slightly towards mouse (magnetic cell attraction)
          finalX += forceDirectionX * force * 15 * p.depth;
          finalY += forceDirectionY * force * 15 * p.depth;
        }

        // Draw particle node
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = p.color === colors[0] ? "#0066FF" : p.color === colors[1] ? "#00C8FF" : "#00FF99";
        
        ctx.beginPath();
        ctx.arc(finalX, finalY, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for next operations

        // Connect nearby particles within molecular nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const scrollOffset2 = scrollProgress * 400 * p2.depth;
          const p2Y = p2.baseY - scrollOffset2;
          
          const connectDx = finalX - p2.x;
          const connectDy = finalY - p2Y;
          const connectDist = Math.hypot(connectDx, connectDy);

          const maxConnectDist = window.innerWidth < 768 ? 85 : 125;

          if (connectDist < maxConnectDist) {
            const lineOpacity = (1 - connectDist / maxConnectDist) * 0.12 * Math.min(p.opacity, p2.opacity);
            ctx.strokeStyle = `rgba(0, 200, 255, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(finalX, finalY);
            ctx.lineTo(p2.x, p2Y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      id="particles-stage"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "linear-gradient(to bottom, #090B11, #0E121E)" }}
    />
  );
}
