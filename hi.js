console.log("✨ Welcome to the Beautiful Color Box Experience! ✨");

const box = document.querySelector('.box');
const button = document.querySelector('.button');

// Enhanced color palette with gradients and solid colors
const colors = [
    '#ff9800', // orange
    '#673ab7', // purple
    '#4caf50', // green
    '#2196f3', // blue
    '#e91e63', // pink
    '#00bcd4', // cyan
    '#f44336', // red
    '#ffc107', // amber
    '#8bc34a', // light green
    '#3f51b5', // indigo
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)'
];

let usedColors = [];
let particleCount = 0;

function getNextColor(currentColor) {
    const available = colors.filter(c => c !== currentColor && !usedColors.includes(c));
    if (available.length === 0) {
        usedColors = [];
        return getNextColor(currentColor);
    }
    const next = available[Math.floor(Math.random() * available.length)];
    usedColors.push(next);
    return next;
}

function getContrastColor(colorValue) {
    // Handle gradients - return white for better visibility
    if (colorValue.includes('gradient')) {
        return '#fff';
    }
    
    const hexVal = colorValue.replace('#', '');
    const r = parseInt(hexVal.substring(0,2), 16);
    const g = parseInt(hexVal.substring(2,4), 16);
    const b = parseInt(hexVal.substring(4,6), 16);
    const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
    return luminance > 0.5 ? '#222' : '#fff';
}

// Create floating particles effect
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: ${colors[Math.floor(Math.random() * 10)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${x}px;
        top: ${y}px;
        animation: float 2s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 2000);
}

// Add CSS animation for particles
function addParticleStyles() {
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0) scale(1) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-200px) scale(0) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .box {
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
            }
            
            .box:hover {
                animation: pulse 2s infinite;
            }
            
            .button {
                transition: all 0.3s ease !important;
            }
            
            .button:hover {
                transform: translateY(-2px) !important;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2) !important;
            }
            
            .button:active {
                transform: translateY(0) scale(0.98) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced color change with beautiful effects
function changeBoxColor() {
    if (!box) return;
    
    let currentColor = box.style.background || window.getComputedStyle(box).backgroundColor;
    const nextColor = getNextColor(currentColor);
    
    // Add ripple effect
    const ripple = document.createElement('div');
    const rect = box.getBoundingClientRect();
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: 50%;
        top: 50%;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
        pointer-events: none;
    `;
    
    // Add ripple animation if not exists
    if (!document.getElementById('ripple-styles')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-styles';
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    box.style.position = 'relative';
    box.appendChild(ripple);
    
    // Apply the new color with enhanced animation
    box.style.background = nextColor;
    box.style.transform = 'scale(1.1) rotate(2deg)';
    box.style.color = getContrastColor(nextColor);
    box.style.filter = 'brightness(1.1) saturate(1.2)';
    
    // Create particles at button location
    const buttonRect = button.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createParticle(
                buttonRect.left + buttonRect.width/2 + (Math.random() - 0.5) * 40,
                buttonRect.top + buttonRect.height/2 + (Math.random() - 0.5) * 40
            );
        }, i * 50);
    }
    
    // Reset transform with smooth transition
    setTimeout(() => {
        box.style.transform = 'scale(1) rotate(0deg)';
        box.style.filter = 'brightness(1) saturate(1)';
    }, 400);
    
    // Remove ripple element
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
    
    // Add text content with animation
    const messages = [
        '✨ Beautiful!', '🎨 Gorgeous!', '🌈 Amazing!', '💫 Stunning!', 
        '🎭 Fantastic!', '🌟 Brilliant!', '🎪 Magical!', '🦋 Elegant!'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    box.textContent = randomMessage;
    
    setTimeout(() => {
        box.textContent = 'Click me!';
    }, 1500);
}

// Initialize the beautiful experience
if (box && button) {
    // Add initial styling and animations
    addParticleStyles();
    
    // Set initial content
    box.textContent = box.textContent || 'Click me!';
    
    // Enhanced button click handler
    button.addEventListener('click', (e) => {
        // Prevent rapid clicking
        if (button.disabled) return;
        button.disabled = true;
        
        // Add button click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Execute color change with all effects
        changeBoxColor();
        
        // Re-enable button after animation
        setTimeout(() => {
            button.disabled = false;
        }, 800);
    });
    
    // Add keyboard support (spacebar or enter)
    document.addEventListener('keydown', (e) => {
        if ((e.code === 'Space' || e.code === 'Enter') && !button.disabled) {
            e.preventDefault();
            button.click();
        }
    });
    
    // Add double-click for random burst of particles
    box.addEventListener('dblclick', (e) => {
        const rect = box.getBoundingClientRect();
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createParticle(
                    rect.left + Math.random() * rect.width,
                    rect.top + Math.random() * rect.height
                );
            }, i * 30);
        }
    });
    
    // Add mouse enter/leave effects
    box.addEventListener('mouseenter', () => {
        box.style.filter = 'brightness(1.1) saturate(1.3)';
    });
    
    box.addEventListener('mouseleave', () => {
        box.style.filter = 'brightness(1) saturate(1)';
    });
    
    console.log('🎉 Beautiful Color Box is ready! Try clicking, double-clicking, or using Space/Enter keys!');
} else {
    console.error('❌ Could not find .box or .button elements. Make sure your HTML has these classes!');
}