"use client";

import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { NAV_LINKS } from "../navbar.constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const menuContainerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-blue-950/95 backdrop-blur-xl z-40 lg:hidden"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4"
            variants={menuContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Navigation Links */}
            <motion.ul className="flex flex-col items-center gap-4 w-full max-w-xs">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.name}
                  className="w-full text-center"
                  variants={itemVariants}
                  custom={index}
                >
                  {link.children ? (
                    <motion.div 
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      <motion.span 
                        className="block text-lg sm:text-xl font-medium tracking-wide text-white/50 py-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        {link.name}
                      </motion.span>
                      <motion.ul 
                        className="flex flex-col items-center gap-1.5 mt-1"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.05,
                              delayChildren: 0.3
                            }
                          }
                        }}
                      >
                        {link.children.map((child) => (
                          <motion.li 
                            key={child.name}
                            variants={itemVariants}
                          >
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block text-sm sm:text-base font-medium tracking-wide text-white/90 hover:text-[#B594FF] transition-colors py-1"
                            >
                              <motion.span
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                {child.name}
                              </motion.span>
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  ) : (
                    <Link
                      href={link.href || "#"}
                      onClick={onClose}
                      className="block text-lg sm:text-xl font-medium tracking-wide text-white/90 hover:text-[#B594FF] transition-colors py-2"
                    >
                      <motion.span
                        whileHover={{ scale: 1.05, x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  )}
                </motion.li>
              ))}
            </motion.ul>

            {/* Mobile Action Buttons */}
            <motion.div 
              className="flex flex-col gap-3 w-full max-w-xs mt-6"
              variants={buttonVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/register"
                  onClick={onClose}
                  className="w-full text-center bg-[#7C4AED] hover:bg-[#6D39D2] text-white py-3 rounded-xl text-sm sm:text-base font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(124,74,237,0.3)] active:scale-95 block"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/login"
                  onClick={onClose}
                  className="w-full text-center border border-[#7C4AED]/45 hover:border-[#7C4AED] hover:bg-[#7C4AED]/10 text-white py-3 rounded-xl text-sm sm:text-base font-semibold tracking-wide transition-all block"
                >
                  Sign in
                </Link>
              </motion.div>
            </motion.div>

            {/* Close hint */}
            <motion.p 
              className="absolute bottom-8 text-white/40 text-xs tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Tap outside or click menu to close
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};