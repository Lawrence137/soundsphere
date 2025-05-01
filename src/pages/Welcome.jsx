import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/layout/Footer';

const Welcome = () => {
  const { currentUser } = useAuth();
  const canvasRef = useRef(null);

  // Enhanced particle animation with music-inspired effects
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class with enhanced visuals
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.hue = Math.random() * 360;
        this.growing = Math.random() > 0.5;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Pulse effect
        if (this.growing) {
          this.opacity += this.pulseSpeed;
          this.size += 0.1;
          if (this.opacity >= 1) this.growing = false;
        } else {
          this.opacity -= this.pulseSpeed;
          this.size -= 0.1;
          if (this.opacity <= 0.3) this.growing = true;
        }

        // Hue shift for a music-inspired effect
        this.hue = (this.hue + 1) % 360;

        // Reset particle if it goes off screen
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${this.hue}, 70%, 60%, 0.5)`;
        ctx.fill();
      }
    }

    // Create particles
    const createParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };
    createParticles();

    // Animation loop with enhanced connections
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Connect nearby particles with glowing lines
      particles.forEach(particle1 => {
        particles.forEach(particle2 => {
          const dx = particle1.x - particle2.x;
          const dy = particle1.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${particle1.hue}, 70%, 60%, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
      },
    },
  };

  const features = [
    {
      icon: '🎵',
      title: 'Create',
      description: 'Upload and manage your music catalog with powerful tools.',
      gradient: 'from-violet-600 to-fuchsia-600',
    },
    {
      icon: '📊',
      title: 'Analytics',
      description: 'Get detailed analytics and insights about your audience.',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      icon: '💰',
      title: 'Earn',
      description: 'Monetize your music through multiple revenue streams.',
      gradient: 'from-emerald-600 to-teal-600',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-hidden">
      {/* Enhanced Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-20"
        style={{ opacity: 0.7 }}
      />

      {/* Dynamic Gradient Layers */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-purple-950/50 to-black opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-pink-600/20 animate-gradient-x" />
          <div className="absolute inset-0 bg-gradient-to-b from-violet-600/20 via-fuchsia-600/20 to-pink-600/20 animate-gradient-y" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.2),transparent_70%)] animate-pulse-slow" />
        </div>
      </div>

      <div className="flex-grow relative">
        <div className="container mx-auto px-4 py-4 sm:py-8">
          {/* Navigation */}
          <motion.nav
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex justify-between items-center mb-8 sm:mb-16 relative z-10"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400"
            >
              SoundSphere
            </motion.div>
            <div className="flex items-center gap-3 sm:gap-5">
              {!currentUser ? (
                <>
                  <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                    <Link
                      to="/login"
                      className="text-white hover:text-fuchsia-300 transition-colors px-4 py-2 text-sm sm:text-base font-medium"
                    >
                      Log in
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(236, 72, 153, 0.5)' }}>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-5 py-2 sm:px-7 sm:py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-fuchsia-600/40 text-sm sm:text-base font-semibold"
                    >
                      Sign up
                    </Link>
                  </motion.div>
                </>
              ) : (
                <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(236, 72, 153, 0.5)' }}>
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-5 py-2 sm:px-7 sm:py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-fuchsia-600/40 text-sm sm:text-base font-semibold"
                  >
                    Dashboard
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.nav>

          {/* Hero Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto text-center text-white mt-12 sm:mt-24 mb-16 sm:mb-32 px-4 relative z-10"
          >
            <motion.div
              variants={itemVariants}
              className="relative inline-block"
            >
              <h1 className="glow-text text-5xl sm:text-7xl md:text-8xl font-extrabold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 flex flex-col gap-3 sm:gap-5">
                <span>Your Music,</span>
                <span>Your Way</span>
              </h1>
              <div className="absolute -inset-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 rounded-lg opacity-30 blur-2xl -z-10 animate-pulse-slow" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl mb-10 sm:mb-14 text-gray-200 max-w-3xl mx-auto px-4 leading-relaxed"
            >
              Welcome to SoundSphere - the platform that empowers artists to create, share, and monetize their music like never before.
            </motion.p>

            {!currentUser && (
              <motion.div
                variants={containerVariants}
                className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 px-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    to="/register"
                    className="block w-full sm:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-fuchsia-600/50 glow-button"
                  >
                    Launch Your Journey
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    to="/login"
                    className="block w-full sm:w-auto border-2 border-white/20 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full text-base sm:text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                  >
                    Explore More
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 mb-12 sm:mb-20 relative z-10"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.05, rotate: 2 }}
                className="relative p-6 sm:p-8 rounded-2xl overflow-hidden group bg-white/5 backdrop-blur-lg border border-white/10"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl sm:text-5xl mb-4 sm:mb-5"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:from-violet-400 group-hover:to-fuchsia-400 transition-all duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modernized Footer */}
      <Footer />

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        @keyframes gradient-x {
          0% { transform: translateX(-30%); }
          50% { transform: translateX(30%); }
          100% { transform: translateX(-30%); }
        }

        @keyframes gradient-y {
          0% { transform: translateY(-30%); }
          50% { transform: translateY(30%); }
          100% { transform: translateY(-30%); }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))
                    drop-shadow(0 0 40px rgba(236, 72, 153, 0.4));
          }
          50% { 
            filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.8))
                    drop-shadow(0 0 50px rgba(236, 72, 153, 0.5));
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }

        .animate-gradient-x {
          animation: gradient-x 20s ease infinite;
        }

        .animate-gradient-y {
          animation: gradient-y 20s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .glow-text {
          text-shadow: 
            0 0 10px rgba(139, 92, 246, 0.6),
            0 0 20px rgba(236, 72, 153, 0.4),
            0 0 30px rgba(139, 92, 246, 0.3),
            0 0 40px rgba(236, 72, 153, 0.2);
          animation: pulse-glow 4s ease-in-out infinite;
          position: relative;
        }

        .glow-button {
          box-shadow: 
            0 0 10px rgba(139, 92, 246, 0.5),
            0 0 20px rgba(236, 72, 153, 0.3);
          transition: box-shadow 0.3s ease;
        }

        .glow-button:hover {
          box-shadow: 
            0 0 20px rgba(139, 92, 246, 0.7),
            0 0 30px rgba(236, 72, 153, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Welcome;