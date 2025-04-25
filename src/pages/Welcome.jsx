import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/layout/Footer';

const Welcome = () => {
  const { currentUser } = useAuth();
  const canvasRef = useRef(null);

  // Particle animation setup
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

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5;
        this.growing = Math.random() > 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Opacity animation
        if (this.growing) {
          this.opacity += 0.005;
          if (this.opacity >= 0.5) this.growing = false;
        } else {
          this.opacity -= 0.005;
          if (this.opacity <= 0) this.growing = true;
        }

        // Reset particle if it goes off screen
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    const createParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };
    createParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Connect nearby particles
      particles.forEach(particle1 => {
        particles.forEach(particle2 => {
          const dx = particle1.x - particle2.x;
          const dy = particle1.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const features = [
    {
      icon: "🎵",
      title: "Create",
      description: "Upload and manage your music catalog with powerful tools",
      gradient: "from-violet-500 to-fuchsia-500",
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Get detailed analytics and insights about your audience",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "💰",
      title: "Earn",
      description: "Monetize your music through multiple revenue streams",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  // Define the dot pattern SVG
  const dotPattern = `
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.22676" cy="1.22676" r="1.22676" fill="rgba(255,255,255,0.07)"/>
    </svg>
  `;
  const encodedDotPattern = `data:image/svg+xml,${encodeURIComponent(dotPattern)}`;

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-20"
        style={{ opacity: 0.3 }}
      />

      {/* Animated Gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-black opacity-80" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 animate-gradient-x" />
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 animate-gradient-y" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,255,0.1),transparent_70%)] animate-pulse-slow" />
        </div>
      </div>

      <div className="flex-grow relative">
        <div className="container mx-auto px-4 py-4 sm:py-8">
          {/* Navigation */}
          <motion.nav 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-8 sm:mb-16 relative"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500"
            >
              SoundSphere
            </motion.div>
            <div className="flex items-center gap-2 sm:gap-4">
              {!currentUser ? (
                <>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                      to="/login"
                      className="text-white hover:text-fuchsia-400 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base"
                    >
                      Log in
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-fuchsia-500/25 text-sm sm:text-base"
                    >
                      Sign up
                    </Link>
                  </motion.div>
                </>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-fuchsia-500/25 text-sm sm:text-base"
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
            className="max-w-5xl mx-auto text-center text-white mt-8 sm:mt-20 mb-16 sm:mb-32 px-4"
          >
            <motion.div
              variants={itemVariants}
              className="relative inline-block"
            >
              <h1 className="glow-text text-4xl sm:text-6xl md:text-7xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 flex flex-col gap-2 sm:gap-4">
                <span>Your Music,</span>
                <span>Your Way</span>
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-lg opacity-20 blur-xl -z-10" />
            </motion.div>
            
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed"
            >
              Welcome to SoundSphere - the platform that empowers artists to create,
              share, and monetize their music like never before.
            </motion.p>
            
            {!currentUser && (
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 px-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    to="/register"
                    className="block w-full sm:w-auto bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-fuchsia-500/25"
                  >
                    Get Started
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    to="/login"
                    className="block w-full sm:w-auto border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-white hover:text-black transition-all duration-200"
                  >
                    Learn More
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 mb-8 sm:mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative p-6 sm:p-8 rounded-2xl overflow-hidden group`}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className="absolute inset-0 backdrop-blur-xl bg-white/5" />
                
                {/* Content */}
                <div className="relative">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">{feature.title}</h3>
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
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        @keyframes gradient-x {
          0% { transform: translateX(-50%); }
          50% { transform: translateX(50%); }
          100% { transform: translateX(-50%); }
        }

        @keyframes gradient-y {
          0% { transform: translateY(-50%); }
          50% { transform: translateY(50%); }
          100% { transform: translateY(-50%); }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 25px rgba(139, 92, 246, 0.5))
                    drop-shadow(0 0 45px rgba(236, 72, 153, 0.3));
          }
          50% { 
            filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.7))
                    drop-shadow(0 0 55px rgba(236, 72, 153, 0.4));
          }
        }

        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }

        .animate-gradient-y {
          animation: gradient-y 15s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .glow-text {
          text-shadow: 
            0 0 10px rgba(139, 92, 246, 0.5),
            0 0 20px rgba(236, 72, 153, 0.3),
            0 0 30px rgba(139, 92, 246, 0.3),
            0 0 40px rgba(236, 72, 153, 0.2);
          filter: drop-shadow(0 0 25px rgba(139, 92, 246, 0.5))
                 drop-shadow(0 0 45px rgba(236, 72, 153, 0.3));
          animation: pulse-glow 3s ease-in-out infinite;
          position: relative;
        }

        .glow-text::before {
          content: '';
          position: absolute;
          inset: -10px -20px;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(139, 92, 246, 0.1),
            transparent 70%
          );
          z-index: -1;
          filter: blur(20px);
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default Welcome; 