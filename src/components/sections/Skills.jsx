import React from 'react';
import * as Icons from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import { skills } from '../../data/skills';

const Skills = () => {
    const skillCategories = {
        'Frontend Development': ['JavaScript', 'React', 'HTML', 'CSS'],
        'Backend APIs': ['Node.js', 'Python', 'Django', 'SQL'],
        'Tools & Others': ['Git'],
    };

    const getProficiencyLevel = (level) => {
        const levels = {
            Expert: 95,
            Advanced: 80,
            Intermediate: 60,
            Beginner: 40,
        };

        return levels[level] || 50;
    };

    const getLevelColor = (level) => {
        const colors = {
            Expert: 'border-[#8DFF69]/30 bg-[#8DFF69]/20 text-[#8DFF69]',
            Advanced: 'border-cyan-500/30 bg-cyan-500/20 text-cyan-400',
            Intermediate: 'border-emerald-500/30 bg-emerald-500/20 text-emerald-400',
            Beginner: 'border-amber-500/30 bg-amber-500/20 text-amber-400',
        };

        return colors[level] || 'border-gray-500/30 bg-gray-500/20 text-gray-400';
    };

    return (
        <section id="skills" className="relative overflow-hidden bg-black py-20">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-primary/10 opacity-50 blur-3xl" />
                <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-primary/10 opacity-50 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeIn delay={100}>
                    <div className="mb-16 text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                            <Icons.Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">My Expertise</span>
                        </div>
                        <h2 className="mb-4 text-4xl font-normal text-white lg:text-5xl">Skills & Technologies</h2>
                        <p className="mx-auto max-w-2xl text-lg text-white/60">
                            A comprehensive overview of my technical skills and proficiencies across frontend, backend,
                            and tooling.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {Object.entries(skillCategories).map(([category, skillNames], categoryIndex) => {
                        const categorySkills = skills.filter((skill) => skillNames.includes(skill.name));

                        return (
                            <FadeIn key={category} delay={categoryIndex * 100}>
                                <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-primary/30">
                                    <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                                        <div className="h-8 w-1 rounded-full bg-linear-to-b from-primary/30 to-primary/10" />
                                        <h3 className="text-xl font-medium text-white">{category}</h3>
                                    </div>

                                    <div className="space-y-5">
                                        {categorySkills.map((skill) => {
                                            const IconComponent = Icons[skill.icon] || Icons.Code2;
                                            const proficiency = getProficiencyLevel(skill.level);

                                            return (
                                                <div key={skill.id} className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="rounded-lg bg-white/5 p-2">
                                                                <IconComponent className="h-4 w-4 text-primary" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-white">{skill.name}</div>
                                                                <div className="text-xs text-white/50">{skill.experience}</div>
                                                            </div>
                                                        </div>

                                                        <span className={`rounded-full border px-2 py-1 text-xs ${getLevelColor(skill.level)}`}>
                                                            {skill.level}
                                                        </span>
                                                    </div>

                                                    <div className="relative h-1.5 overflow-hidden rounded-full bg-white/5">
                                                        <div
                                                            className="absolute left-0 top-0 h-full rounded-full bg-linear-to-r from-primary/10 to-primary/80 transition-all duration-1000 ease-out"
                                                            style={{ width: `${proficiency}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-primary/0 to-primary/5 transition-all duration-300 group-hover:from-primary/5 group-hover:to-primary/5" />
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;