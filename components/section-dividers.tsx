export function WaveDivider({ variant = 'top' }: { variant?: 'top' | 'bottom' }) {
    return (
        <div className={`relative w-full ${variant === 'top' ? '-mb-1' : '-mt-1'}`}>
            <svg
                className="w-full h-12 md:h-20 fill-primary/5"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {variant === 'top' ? (
                    <path d="M0,0 L0,60 Q360,90 720,60 T1440,60 L1440,0 Z" />
                ) : (
                    <path d="M0,60 L0,120 L1440,120 L1440,60 Q1080,30 720,60 T0,60 Z" />
                )}
            </svg>
        </div>
    )
}

export function GradientDivider() {
    return (
        <div className="relative w-full h-px my-12">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
    )
}
