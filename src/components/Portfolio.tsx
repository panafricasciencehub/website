'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import project1Img from '../assets/project_1.jpeg'
import project2Img from '../assets/project_2.jpeg'
import project3Img from '../assets/project_3.jpeg'
import project4Img from '../assets/project_4.jpeg'
import project5Img from '../assets/project_5.jpeg'
import project6Img from '../assets/project_6.jpeg'
import project7Img from '../assets/project_7.jpeg'
import project8Img from '../assets/project_8.jpeg'

const projects = [
  {
    id: 1,
    title: "PASH International Webinars & Scientific Engagements",
    image: project1Img,
    description: "Pan African Science Hub organizes international webinars connecting students and researchers with global experts to promote innovation, mentorship, scientific excellence, collaboration, and exposure to frontier research opportunities.",
    client: "Global Students & Researchers",
    industry: "Education & Science"
  },
  {
    id: 2,
    title: "Frontier Science Awareness Initiative",
    image: project2Img,
    description: "Pan African Science Hub Frontier Science Awareness Initiative inspires students through emerging sciences, innovation, mentorship, workshops, and research exposure to nurture future African scientists, innovators, and problem-solvers.",
    client: "African Students",
    industry: "Education & Innovation"
  },
  {
    id: 3,
    title: "PASH Open Science & Global Learning Initiative",
    image: project3Img,
    description: "Pan African Science Hub’s Open Science & Global Learning Initiative connects African students with world-class educational resources, promoting self-learning, research, innovation, critical thinking, and access to global scientific knowledge and opportunities.",
    client: "African Students",
    industry: "Education & Research"
  },
  {
    id: 4,
    title: "Pharmaceutical Diagnostic Analysis Web Application",
    image: project4Img,
    description: "Pan African Science Hub’s Pharmaceutical Diagnostic Analysis Web Application is currently in development, aiming to provide smart healthcare guidance, medication support, and improved healthcare accessibility for underserved communities.",
    client: "Underserved Communities",
    industry: "Healthcare Technology"
  },
  {
    id: 5,
    title: "Digital Transformation at INTERCITY DAIRY FARM",
    image: project5Img,
    description: "Pan African Science Hub is supporting the digital transformation of INTERCITY DAIRY FARM through innovative technologies, smart farm management, data-driven solutions, and modern agricultural practices to improve productivity, sustainability, and operational efficiency.",
    client: "INTERCITY DAIRY FARM",
    industry: "Agriculture Technology"
  },
  {
    id: 6,
    title: "Advancing Research Against Infectious Diseases",
    image: project6Img,
    description: "Pan African Science Hub is advancing infectious disease research by studying medicinal plants and natural compounds against tuberculosis, typhoid, and malaria to promote affordable, evidence-based healthcare innovation and biomedical discovery.",
    client: "Global Health Community",
    industry: "Medical Research"
  },
  {
    id: 7,
    title: "Ultra-Fast 5-Minute Water Purification System",
    image: project7Img,
    description: "Pan African Science Hub is developing an ultra-fast 8-stage water purification system using high-pressure RO, UV-C, and ozone technologies to deliver safe, high-volume clean water efficiently for communities and institutions.",
    client: "Communities & Institutions",
    industry: "Environmental Engineering"
  },
  {
    id: 8,
    title: "Social Behavioural Change Communication (SBCC) Program for Secondary Schools",
    image: project8Img,
    description: "Pan African Science Hub’s Social Behavioural Change Communication (SBCC) Program empowers secondary school students through life skills education, peer engagement, counselling, and awareness initiatives that promote positive behaviour, health, discipline, gender equality, and responsible decision-making.",
    client: "Secondary Schools",
    industry: "Education & Social Dev"
  }
];

export function Portfolio() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = current.clientWidth * 0.8 // Scroll 80% of width
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="portfolio" className="relative py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-muted-foreground">
                Ongoing Projects
              </span>
              <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
            </div>

            <h2 className="text-5xl sm:text-6xl font-black leading-tight">
              <span className="block">Ongoing Projects</span>
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              className="p-4 rounded-full border border-black/10 hover:bg-black/5 transition-colors gentle-animation bg-white shadow-md"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-4 rounded-full border border-black/10 hover:bg-black/5 transition-colors gentle-animation bg-white shadow-md"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider Container */}
      <div className="w-full relative">
        <style dangerouslySetInnerHTML={{
          __html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 px-6 sm:px-8 lg:px-12 pb-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="min-w-[85vw] md:min-w-[600px] lg:min-w-[800px] snap-center shrink-0 flex flex-col bg-white clean-border rounded-3xl overflow-hidden elevated-shadow group cursor-grab active:cursor-grabbing"
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Badge */}
                <div className="absolute top-6 right-6">
                  <span className="glass-effect rounded-xl px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                    In Progress
                  </span>
                </div>
              </div>

              {/* Content Box */}
              <div className="p-8 lg:p-10 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-accent-purple/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    {project.industry}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    Client: {project.client}
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h3>

                <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
