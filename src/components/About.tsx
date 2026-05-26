'use client'

import { Target, Eye, Microscope, Globe, Lightbulb, HeartHandshake, Rocket, Sparkles } from 'lucide-react'

export function About() {
  const coreValues = [
    {
      title: "Scientific Excellence",
      description: "Conducting rigorous, ethical, and evidence-based research while strengthening capacity across African institutions.",
      icon: Microscope,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "Pan-African Unity",
      description: "Promoting cross-border collaboration to address continent-wide challenges through shared knowledge and mutual respect.",
      icon: Globe,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      title: "Knowledge for Impact",
      description: "Translating academic research into real-world solutions that improve lives and drive sustainable progress.",
      icon: Lightbulb,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      title: "Inclusivity & Equity",
      description: "Creating equal opportunities for participation in science across all genders, regions, and economic backgrounds.",
      icon: HeartHandshake,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "Youth Empowerment",
      description: "Nurturing curiosity and leadership in young scientists through mentorship and training.",
      icon: Rocket,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      title: "Innovation & Creativity",
      description: "Encouraging bold, interdisciplinary problem-solving that integrates indigenous knowledge with modern science.",
      icon: Sparkles,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600"
    }
  ]

  return (
    <section id="about" className="relative py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 max-w-7xl">
        
        {/* Header - Who We Are */}
        <div className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              About Us
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8 text-gray-900">
            Who We Are
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            The Pan-African Science Hub (PASH) unites scientists from Africa and the global diaspora to accelerate research, innovation, and collaboration. Despite having over 1.4 billion people, Africa contributes less than 2% of global research output. PASH bridges this gap by providing a central platform for scientists across disciplines to connect, share knowledge, and collaborate. We serve as a research catalyst, funding advocate, and educational hub, focusing on frontier sciences like AI, biotechnology, and genomics to drive Africa’s sustainable development.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {/* Mission */}
          <div className="bg-gray-50 p-10 lg:p-12 rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              To promote science education, research culture, and innovation among Africans by providing accessible platforms for learning, collaboration, mentorship, and scientific leadership.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gray-50 p-10 lg:p-12 rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-8">
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              To empower scientists and transform Africa into a global hub of research and innovation, reducing dependence on imported technologies while addressing critical issues like health crises, food insecurity, and climate change through homegrown solutions.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div>
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Our Core Values</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <div 
                  key={index}
                  className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 group"
                >
                  <div className={`w-14 h-14 ${value.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${value.iconColor}`} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
