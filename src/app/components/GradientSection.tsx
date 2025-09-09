'use client';
import React from 'react';

const GradientSection = () => {
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-40px); }
        }
        
        @keyframes glow {
          0% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.95); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .gradient-blob {
          animation: float 4s ease-in-out infinite, glow 3s ease-in-out infinite alternate;
        }
        
        .fade-in-text {
          animation: fade-in 1s ease-out;
        }

        /* Grain overlay más denso */
        .grain-background::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 2px 2px, 3px 3px, 4px 4px;
          pointer-events: none;
        }
      `}</style>
      
      <div className="relative w-full h-screen bg-gray-100 overflow-hidden flex items-center justify-center grain-background">
        
        <div 
          className="gradient-blob absolute top-1/2 left-1/2 w-96 h-96 max-w-sm max-h-sm"
          style={{
            background: 'radial-gradient(at 50% 50%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(at 70% 60%, rgb(195, 224, 96) 0%, rgba(195, 224, 96, 0) 90%), radial-gradient(at 30% 30%, rgb(195, 224, 96) 0%, rgba(195, 224, 96, 0) 60%), radial-gradient(at left bottom, rgb(0, 163, 203) 0%, rgba(0, 163, 203, 0) 70%), linear-gradient(135deg, rgba(18, 46, 119, 0) 0%, rgba(18, 46, 119, 0) 75%, rgb(18, 46, 119) 100%), linear-gradient(to right, rgb(98, 87, 147) 0%, rgb(213, 93, 100) 35%, rgb(228, 145, 41) 65%, rgb(192, 103, 28) 100%)',
            borderRadius: '66rem',
            backgroundBlendMode: 'overlay, luminosity, multiply, saturation, color-dodge, lighten',
            filter: 'blur(46px)',
            height: '100%',
            width: '100%',
            maxHeight: '400px',
            maxWidth: '400px'
          }}
        />
        
        {/* Contenido de texto */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="fade-in-text text-xl font-light leading-[1.4] text-[#1c1c1c] no-underline tracking-wide">
            We build <span className="text-gray-900 font-normal">brands that matter</span>, creating digital experiences{' '}
            <span className="text-black font-medium">tailored to your vision</span>.{' '}
            Every project is a partnership, every solution is <span className="text-gray-900 font-normal">crafted with purpose</span>.
          </p>
        </div>

      </div>
    </>
  );
};

export default GradientSection;
