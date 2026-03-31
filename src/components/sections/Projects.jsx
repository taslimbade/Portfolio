import React, { useEffect, useRef, useState } from 'react';
import { projects, categories } from '../../data/projects';
import { Briefcase, Target, Globe, Palette, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from '../ui/ProjectCard';
import FadeIn from '../animations/FadeIn';

const getItemsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
};

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(getItemsPerView);
    const scrollContainerRef = useRef(null);

    const filteredProjects = activeCategory === 'All'
            ? projects
            : projects.filter(project => project.category === activeCategory);
    const maxIndex = Math.max(0, filteredProjects.length - itemsPerView);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerView(getItemsPerView());
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const activeSlideIndex = Math.min(currentIndex, maxIndex);

            // Reset carousel when category chnages
            const handleCategoryChange = (category) => {
                setActiveCategory(category);
                setCurrentIndex(0);
                if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
            };

            const scrollToIndex = (index) => {
                if (scrollContainerRef.current) {
                    const clampedIndex = Math.max(0, Math.min(index, maxIndex));
                    const container = scrollContainerRef.current;
                    const cards = container.querySelectorAll('[data-project-card]');
                    const targetCard = cards[clampedIndex];

                    if (targetCard) {
                        targetCard.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'start',
                        });
                    }

                    setCurrentIndex(clampedIndex);
                }
            };

            const nextSlide = () => {
                const newIndex = Math.min(activeSlideIndex + 1, maxIndex);
                scrollToIndex(newIndex);
            };

            const prevSlide = () => {
                const newIndex = Math.max(activeSlideIndex - 1, 0);
                scrollToIndex(newIndex);
            };

  // Category icons mapping
    const categoryIcons = {
        All: Target,
        'Web Apps': Globe,
        'UI Components': Palette,
        'Full Stack': Zap,
    };

    return (
        <section id="projects" className="relative overflow-hidden bg-black py-20">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-primary/20 opacity-20 blur-3xl" />
                <div className="absolute bottom-1/3 left-0 h-96 w-96 rounded-full bg-primary/20 opacity-20 blur-3xl" />
                <div className="absolute right-1/3 top-1/2 h-96 w-96 rounded-full bg-primary/10 opacity-20 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeIn delay={0}>
                    <div className="mb-12 text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                            <Briefcase className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">My Work</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">Featured Projects</h2>
                        <p className="text-lg text-white/60 max-w-2xl mx-auto">Showcasing my best work and achievements</p>
                    </div>
                </FadeIn>

                {/* Category Filter */}
                <FadeIn delay={100}>
                    <div className="mb-16 flex flex-wrap justify-center gap-3">
                        {categories.map((category) => {
                            const Icon = categoryIcons[category] || Target;

                            return (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`group relative rounded-full px-6 py-3 font-medium transition-all duration-300 ${activeCategory === category 
                                        ? 'text-white' 
                                        : 'text-white/60 hover:text-white'
                                    }`}
                                >
                                    <div className={`absolute inset-0 rounded-full transition-all duration-300 ${activeCategory === category
                                                ? 'bg-primary/10 opacity-100'
                                                : 'bg-white/5 border border-white/10 group-hover:bg-white/10'
                                        }`}
                                    />

                                    <div className="relative flex items-center gap-2">
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm">{category}</span>
                                    </div>

                                    {activeCategory === category && (
                                        <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-50 -z-10" />
                                    )}
                                    </button>
                            );
                        })}
                    </div>
                </FadeIn>

                {/* Projects Carousel */}
                <FadeIn delay={200}>
                    <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
                    >
                    <div className="flex gap-6 pb-4">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            data-project-card
                            className="h-full w-full shrink-0 snap-start md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                    </div>
                    </div>

                    {/* Navigation Arrows */}
                    {maxIndex > 0 && (
                        <>
                                <button
                                    onClick={prevSlide}
                                    disabled={activeSlideIndex === 0}
                                    className="flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                                    aria-label="Previous projects"
                                >
                                    <ChevronLeft className="w-6 h-6 text-white" />
                                    </button>

                                    <button
                                        onClick={nextSlide}
                                        disabled={activeSlideIndex >= maxIndex}
                                        className="flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                                        aria-label="Next projects"
                                        >
                                            <ChevronRight className="w-6 h-6 text-white" />
                                            </button>
                                            </>
                    )}

                    {/* Navigation Dots */}
                    {maxIndex > 0 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                                <button 
                                    key={index}
                                    onClick={() => scrollToIndex(index)}
                                    className={`transition-all duration-300 rounded-full ${index === activeSlideIndex
                                        ? 'bg-primary w-6 h-2'
                                        : 'bg-white/30 w-2 h-2 hover:bg-white/50'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                                </div>
                    )}
                    </div>
                    </FadeIn>
                    </div>
                    </section>
    )
}

export default Projects;
