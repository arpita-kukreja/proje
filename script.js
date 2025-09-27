function initThree() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ 
                alpha: true, 
                antialias: window.innerWidth > 768 // Only use antialias on larger screens
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize for mobile
            document.getElementById('three-container').appendChild(renderer.domElement);

            // Create floating particles (fewer on mobile)
            const geometry = new THREE.BufferGeometry();
            const particleCount = window.innerWidth > 768 ? 100 : 50;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 20;
                positions[i + 1] = (Math.random() - 0.5) * 20;
                positions[i + 2] = (Math.random() - 0.5) * 20;

                colors[i] = Math.random();
                colors[i + 1] = Math.random() * 0.5 + 0.5;
                colors[i + 2] = 1;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: window.innerWidth > 768 ? 0.1 : 0.15,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            camera.position.z = 5;
        }

        function animateThree() {
            requestAnimationFrame(animateThree);
            
            if (particles) {
                particles.rotation.x += 0.001;
                particles.rotation.y += 0.002;
            }
            
            renderer.render(scene, camera);
        }

        // Enhanced mobile-friendly animations with touch support
        let touchStartY = 0;
        let touchEndY = 0;
        
        // Touch event handlers for mobile
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swiping up
                    triggerScrollAnimations();
                } else {
                    // Swiping down
                    triggerScrollAnimations();
                }
            }
        }
        // Add download resume functionality
function downloadResume() {
            // Create a simple resume download simulation
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'Arpita_Kukreja_Resume.pdf';
            
            // Create a blob with resume content
            const resumeContent = `
                ARPITA KUKREJA - AI/ML Engineer
                
                Contact: +91-8384073123
                Email: arpitakukreja18@gmail.com
                Location: Rohini, Delhi
                
                EDUCATION:
                B.Tech CSE(AIML) - CGPA: 9.0
                
                EXPERIENCE:
                - Research Intern at IIT Bombay
                - Web Development Intern at Encryptix
                
                SKILLS:
                Programming: Python, JavaScript, Java, C++
                Web Dev: React, Node.js, Flask
                AI/ML: TensorFlow, OpenCV, NLP
                
                Visit portfolio for complete details!
            `;
            
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            link.href = URL.createObjectURL(blob);
            link.click();
        }

        // Add resume download button to hero
        // setTimeout(() => {
        //     const heroContent = document.querySelector('.hero-content');
        //     const downloadBtn = document.createElement('a');
        //     downloadBtn.textContent = 'Download Resume';
        //     downloadBtn.className = 'cta-button';
        //     downloadBtn.style.marginLeft = '20px';
        //     downloadBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
        //     downloadBtn.onclick = downloadResume;
        //     heroContent.appendChild(downloadBtn);
            
        //     gsap.fromTo(downloadBtn, 
        //         { opacity: 0, y: 30 }, 
        //         { opacity: 1, y: 0, duration: 1, delay: 3 }
        //     );
        // }, 3000);

        document.addEventListener('DOMContentLoaded', () => {
    const buttonContainer = document.querySelector('.button-container');
    if (buttonContainer) {
        const downloadBtn = document.createElement('a');
        downloadBtn.textContent = 'Download Resume';
        downloadBtn.className = 'cta-button download-resume';
        downloadBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
        downloadBtn.onclick = downloadResume;
        buttonContainer.appendChild(downloadBtn);
        
        gsap.fromTo(downloadBtn, 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 1, delay: 0.5 }
        );
    }
});

        function triggerScrollAnimations() {
            // Re-trigger intersection observer check
            document.querySelectorAll('.about-text, .stat-card, .skill-category, .project-card, .achievement-card, .timeline-item, .education-item, .cert-card').forEach(el => {
                observer.unobserve(el);
                observer.observe(el);
            });
        }

        // Mobile-optimized particle animation
        function animateThree() {
            requestAnimationFrame(animateThree);
            
            if (particles) {
                // Slower animation on mobile for better performance
                const speed = window.innerWidth > 768 ? 0.002 : 0.001;
                particles.rotation.x += speed * 0.5;
                particles.rotation.y += speed;
            }
            
            renderer.render(scene, camera);
        }

        // Enhanced cursor (hidden on touch devices)
        function initCursor() {
            const cursor = document.querySelector('.cursor');
            
            // Hide cursor on touch devices
            if ('ontouchstart' in window) {
                cursor.style.display = 'none';
            } else {
                document.addEventListener('mousemove', (e) => {
                    cursor.style.left = e.clientX + 'px';
                    cursor.style.top = e.clientY + 'px';
                });
            }
        }

        // Mobile-friendly floating elements
        function createFloatingElements() {
            const container = document.querySelector('.floating-elements');
            const elementCount = window.innerWidth > 768 ? 20 : 10; // Fewer elements on mobile
            
            for (let i = 0; i < elementCount; i++) {
                const element = document.createElement('div');
                element.className = 'floating-element';
                element.style.left = Math.random() * 100 + '%';
                element.style.top = Math.random() * 100 + '%';
                element.style.animationDelay = Math.random() * 6 + 's';
                element.style.animationDuration = (Math.random() * 3 + 3) + 's';
                
                // Smaller elements on mobile
                if (window.innerWidth <= 768) {
                    element.style.width = '6px';
                    element.style.height = '6px';
                }
                
                container.appendChild(element);
            }
        }

        // Mobile-optimized parallax
        function setupParallax() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelector('#three-container');
                
                // Reduced parallax effect on mobile for better performance
                const speed = window.innerWidth > 768 ? scrolled * 0.5 : scrolled * 0.2;
                parallax.style.transform = `translateY(${speed}px)`;
            }, { passive: true });
        }

        // Enhanced scroll animations with reverse capability
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element entering viewport - animate in
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0) scale(1) rotateY(0)';
                    entry.target.classList.add('animated');
                    
                    // Animate skill bars
                    if (entry.target.classList.contains('skill-category')) {
                        const progressBars = entry.target.querySelectorAll('.skill-progress');
                        progressBars.forEach(bar => {
                            setTimeout(() => {
                                bar.style.width = bar.dataset.width + '%';
                            }, 500);
                        });
                    }
                    
                    // Animate counters
                    if (entry.target.classList.contains('stat-card') && !entry.target.classList.contains('counted')) {
                        const counter = entry.target.querySelector('.stat-number');
                        animateCounter(counter);
                        entry.target.classList.add('counted');
                    }
                } else {
                    // Element leaving viewport - animate out
                    if (entry.target.classList.contains('animated')) {
                        entry.target.style.opacity = '0';
                        
                        // Different exit animations based on element type
                        if (entry.target.classList.contains('about-text')) {
                            entry.target.style.transform = 'translateX(-50px)';
                        } else if (entry.target.classList.contains('stat-card')) {
                            entry.target.style.transform = 'translateY(30px)';
                        } else if (entry.target.classList.contains('skill-category')) {
                            entry.target.style.transform = 'translateY(50px)';
                            // Reset skill bars
                            const progressBars = entry.target.querySelectorAll('.skill-progress');
                            progressBars.forEach(bar => {
                                bar.style.width = '0%';
                            });
                        } else if (entry.target.classList.contains('project-card')) {
                            entry.target.style.transform = 'translateY(50px)';
                        } else if (entry.target.classList.contains('achievement-card')) {
                            entry.target.style.transform = 'rotateY(15deg)';
                        } else if (entry.target.classList.contains('timeline-item')) {
                            if (entry.target.matches(':nth-child(even)')) {
                                entry.target.style.transform = 'translateX(50px)';
                            } else {
                                entry.target.style.transform = 'translateX(-50px)';
                            }
                        } else if (entry.target.classList.contains('education-item')) {
                            entry.target.style.transform = 'translateX(-50px)';
                        } else if (entry.target.classList.contains('cert-card')) {
                            entry.target.style.transform = 'scale(0.8)';
                        }
                        
                        entry.target.classList.remove('animated');
                        
                        // Reset counter for stat cards
                        if (entry.target.classList.contains('stat-card')) {
                            entry.target.classList.remove('counted');
                            const counter = entry.target.querySelector('.stat-number');
                            counter.textContent = '0';
                        }
                    }
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.about-text, .stat-card, .skill-category, .project-card, .achievement-card, .timeline-item, .education-item, .cert-card').forEach(el => {
            observer.observe(el);
        });

        // Counter animation
        function animateCounter(element) {
            const target = parseFloat(element.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
            }, 16);
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const scrollProgress = document.querySelector('.progress-bar');
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            scrollProgress.style.width = scrollPercent + '%';
            
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Hero animations
        function animateHero() {
            const tl = gsap.timeline();
            tl.to('.hero h1', { opacity: 1, y: 0, duration: 1, delay: 0.5 })
              .to('.hero h2', { opacity: 1, y: 0, duration: 1 }, '-=0.5')
              .to('.hero p', { opacity: 1, y: 0, duration: 1 }, '-=0.5')
              .to('.cta-button', { opacity: 1, y: 0, duration: 1 }, '-=0.5');
        }

        // Modal functions
        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'block';
            gsap.fromTo(`#${modalId} .modal-content`, 
                { scale: 0.3, opacity: 0 }, 
                { scale: 1, opacity: 1, duration:  0.5, ease: "back.out(1.7)" }
            );
        }

        function closeModal(modalId) {
            gsap.to(`#${modalId} .modal-content`, {
                scale: 0.3,
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    document.getElementById(modalId).style.display = 'none';
                }
            });
        }

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal.id);
                }
            });
        });

        // Floating particles
        function createFloatingElements() {
            const container = document.querySelector('.floating-elements');
            for (let i = 0; i < 20; i++) {
                const element = document.createElement('div');
                element.className = 'floating-element';
                element.style.left = Math.random() * 100 + '%';
                element.style.top = Math.random() * 100 + '%';
                element.style.animationDelay = Math.random() * 6 + 's';
                element.style.animationDuration = (Math.random() * 3 + 3) + 's';
                container.appendChild(element);
            }
        }

        // Contact form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const button = e.target.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
            
            setTimeout(() => {
                button.textContent = 'Message Sent! ✓';
                button.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = 'linear-gradient(45deg, #64ffda, #4CAF50)';
                    e.target.reset();
                }, 2000);
            }, 1500);
        });

        // Parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('#three-container');
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        });

        // Rotating text animation for titles
        function startRotatingText() {
            const titles = [
                'AI/ML Enthusiast',
                'Full Stack Developer',
                'Competitive Programmer',
                'Data Scientist',
                'Open Source Contributor',
                'Problem Solver',
                'Continuous Learner'
            ];
            
            let currentIndex = 0;
            const textElement = document.getElementById('rotatingText');
            
            function typeText(text, callback) {
                let i = 0;
                textElement.textContent = '';
                
                const typeInterval = setInterval(() => {
                    if (i < text.length) {
                        textElement.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                        setTimeout(callback, 2000); // Wait 2 seconds before next text
                    }
                }, 100);
            }
            
            function eraseText(callback) {
                const currentText = textElement.textContent;
                let i = currentText.length;
                
                const eraseInterval = setInterval(() => {
                    if (i > 0) {
                        textElement.textContent = currentText.substring(0, i - 1);
                        i--;
                    } else {
                        clearInterval(eraseInterval);
                        callback();
                    }
                }, 50);
            }
            
            function nextTitle() {
                eraseText(() => {
                    currentIndex = (currentIndex + 1) % titles.length;
                    typeText(titles[currentIndex], nextTitle);
                });
            }
;
            
            // Start with first title
            typeText(titles[0], nextTitle);
        }

        // // Photo upload functionality
        // function setupPhotoUpload() {
        //     const profileImg = document.getElementById('profileImg');
            
        //     // Add click event to change photo
        //     profileImg.addEventListener('click', () => {
        //         const input = document.createElement('input');
        //         input.type = 'file';
        //         input.accept = 'image/*';
                
        //         input.onchange = (e) => {
        //             const file = e.target.files[0];
        //             if (file) {
        //                 const reader = new FileReader();
        //                 reader.onload = (e) => {
                                                      
        //                     profileImg.src = e.target.result;
        //                     // Add a subtle animation when photo changes
        //                     gsap.fromTo(profileImg, 
        //                         { scale: 0.8, opacity: 0.5 }, 
        //                         { scale: 1, opacity: 1, duration: 0.5 }
        //                     );
        //                 };
        //                 reader.readAsDataURL(file);
        //             }
        //         };
                
        //         input.click();
        //     });
            
        //     // Add hover hint
        //     profileImg.title = "Click to change photo";
        // }

        // Theme changing functionality
        function changeTheme(themeName) {
            // Remove all existing theme classes
            document.body.classList.remove('theme-purple', 'theme-blue', 'theme-green', 'theme-dark', 'theme-sunset');
            
            // Add new theme class
            document.body.classList.add(themeName);
            
            // Save theme preference
            localStorage.setItem('preferred-theme', themeName);
            
            // Close the dropdown
            document.querySelector('.theme-options').style.display = 'none';
            
            // Animate theme transition
            gsap.to('body', {
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    // Force the background update
                    document.body.style.background = window.getComputedStyle(document.body).background;
                }
            });
        }

        // Add theme initialization code
        document.addEventListener('DOMContentLoaded', () => {
            // Load saved theme
            const savedTheme = localStorage.getItem('preferred-theme');
            if (savedTheme) {
                changeTheme(savedTheme);
            }
            
            // Set up theme option click handlers
            document.querySelectorAll('.theme-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const themeName = e.currentTarget.getAttribute('onclick').match(/'(.*?)'/)[1];
                    changeTheme(themeName);
                });
            });
        });

        // Initialize everything with mobile optimization
        window.addEventListener('load', () => {
            initThree();
            animateThree();
            createFloatingElements();
            animateHero();
            //setupPhotoUpload();
            initCursor();
            setupParallax();
            setupSmoothScrolling();
            
            // Start rotating text effect
            setTimeout(() => {
                startRotatingText();
            }, 1000);
            
            // Animate profile image
            setTimeout(() => {
                gsap.to('#profileImg', { 
                    opacity: 1, 
                    scale: 1, 
                    duration: 1, 
                    ease: "back.out(1.7)" 
                });
            }, 1500);
        });

        // Smooth scrolling setup
        function setupSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
            });
        }

        // Enhanced resize handler for mobile
        window.addEventListener('resize', () => {
            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            }
            
            // Reinitialize floating elements on resize
            const container = document.querySelector('.floating-elements');
            container.innerHTML = '';
            createFloatingElements();
        });

        // Mobile-optimized hover effects
        function setupMobileHoverEffects() {
            document.querySelectorAll('.project-card').forEach(card => {
                // Use touch events for mobile
                if ('ontouchstart' in window) {
                    card.addEventListener('touchstart', () => {
                        gsap.to(card, { scale: 1.02, duration: 0.2 });
                    }, { passive: true });
                    
                    card.addEventListener('touchend', () => {
                        gsap.to(card, { scale: 1, duration: 0.2 });
                    }, { passive: true });
                } else {
                    // Mouse events for desktop
                    card.addEventListener('mouseenter', () => {
                        gsap.to(card, { scale: 1.05, duration: 0.3 });
                    });
                    
                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, { scale: 1, duration: 0.3 });
                    });
                }
            });
        }

        // Mobile-optimized tilt effects
        function setupMobileTiltEffects() {
            document.querySelectorAll('.project-card, .achievement-card, .stat-card').forEach(card => {
                if ('ontouchstart' in window) {
                    // Simplified effect for mobile
                    card.addEventListener('touchstart', () => {
                        card.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(2deg) scale(1.02)';
                    }, { passive: true });
                    
                    card.addEventListener('touchend', () => {
                        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                    }, { passive: true });
                } else {
                    // Full tilt effect for desktop
                    card.addEventListener('mousemove', (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        
                        const rotateX = (y - centerY) / 10;
                        const rotateY = (centerX - x) / 10;
                        
                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                    });
                    
                    card.addEventListener('mouseleave', () => {
                        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                    });
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal').forEach(modal => {
                    if (modal.style.display === 'block') {
                        closeModal(modal.id);
                    }
                });
            }
        });

        // Enhanced navbar scroll effect with mobile optimization
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const scrollProgress = document.querySelector('.progress-bar');
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            scrollProgress.style.width = scrollPercent + '%';
            
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });

        // Add theme dropdown functionality
        document.querySelector('.theme-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const options = document.querySelector('.theme-options');
            options.style.display = options.style.display === 'block' ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            document.querySelector('.theme-options').style.display = 'none';
        });

        // Prevent dropdown from closing when clicking inside it
        document.querySelector('.theme-options').addEventListener('click', (e) => {
            e.stopPropagation();
        });
