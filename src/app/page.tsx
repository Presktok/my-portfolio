import Image from 'next/image'
import Navbar from '../components/Navbar'
import ProjectCard from '../components/ProjectCard'
import SkillCard from '../components/SkillCard'
import ParallaxSection from '../components/ParallaxSection'
import BigRobot from '../components/BigRobot'
import BackgroundManager from '../components/BackgroundManager'
import ContactForm from '../components/ContactForm'

const projects = [
  {
    title: 'Access Shield',
    description: 'Provide personal security system',
    imageUrl: '/projects/Picture4-scaled.jpg',
    technologies: ['Python'],
    githubUrl: 'https://github.com/Presktok/Access_shield',
  },
  {
    title: 'facial authentication system',
    description: 'detect face for authentication',
    imageUrl: '/projects/images.jpeg',
    technologies: ['Python', 'html','css','js'],
    githubUrl: 'https://github.com/Presktok/facial',
  },
  {
    title: 'Logistic Management System',
    description: 'Djkstra algorithm,kruskal algorthm,bfs,dfs,',
    imageUrl: '/projects/images (2).jpeg',
    technologies: ['html', 'css','js', 'dataset'],
    githubUrl: 'https://github.com/Presktok/Inventory_management',
  },
]

const skills = [
  {
    name: 'Cyber Security',
    proficiency: 90,
  },
  {
    name: 'Python',
    proficiency: 85,
  },
  {
    name: 'app development',
    proficiency: 50,
  },

  {
    name: 'Web Development',
    proficiency: 75,
  },
  {
    name:'github',
    proficiency: 70,
  },
  {
    name:'solidity',
     proficiency: 50,
  },
  {
    name:'MySql',
     proficiency: 60,
  }

]

export default function Home() {
  return (
    <main className="min-h-screen text-white morphing-bg">
      {/* Using BackgroundManager to conditionally render backgrounds based on device */}
      <BackgroundManager />
      <Navbar />
      
                  {/* Hero Section */}
            <ParallaxSection offset={0} className="min-h-screen flex items-center justify-center mobile-hero py-8 sm:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-8 sm:space-y-10 animate-fade-in">
                  <div className="space-y-4 sm:space-y-6">
                    <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold gradient-text tracking-tight glow-text">
                      Hey, I'm Prince Kumar
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-light max-w-3xl mx-auto">
                      A passionate Software Developer and Cyber Security Specialist, dedicated to building secure and innovative solutions.
                    </p>
                    <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
                      Currently pursuing B.Tech in Computer Science with specialization in Cyber Security at Graphic Era Hill University.
                    </p>
                  </div>
                  
                  {/* Big Robot */}
                  <div className="mobile-robot mx-auto floating-element pulse-ring my-8 sm:my-12 relative">
                    <BigRobot />
                  </div>
                  
                  <div className="pt-6 flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center items-center px-4">
              <a
                href="https://github.com/Presktok"
                className="trading-button magnetic-button shimmer inline-block text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/prince-kumar-b45964244"
                className="trading-button magnetic-button shimmer inline-block text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://unstop.com/u/princkum86369"
                className="trading-button magnetic-button shimmer inline-block text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unstop
              </a>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* About Section */}
      <ParallaxSection id="about" className="py-12 sm:py-24" offset={30}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-12 text-center gradient-text tracking-tight">
            About Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-300 italic text-center md:text-left">
                "God, I am knocking on your door every day until I get the win."
              </p>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-300">
                <p>
                  I am currently pursuing my B.Tech in Computer Science at Graphic Era Hill University (GEHU). I combine strong academic knowledge with practical experience to build secure and efficient solutions.
                </p>
                <p>
                  With hands-on experience as a Software Developer and Cyber Security Specialist, I am passionate about solving real-world problems, protecting digital assets, and creating innovative solutions.
                </p>
                <p>
                  I am a fast learner, constantly adapting to new technologies and tackling evolving security challenges in today's dynamic digital landscape.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="trading-card p-6">
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p className="text-gray-300">B.Tech in Computer Science</p>
                <p className="text-gray-400">Graphic Era Hill University</p>
              </div>
              <div className="trading-card p-6">
                <h3 className="text-xl font-semibold mb-2">Experience</h3>
                <p className="text-gray-300">Software Developer</p>
                <p className="text-gray-400">Cyber Security Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>

             {/* Projects Section */}
       <ParallaxSection id="projects" className="py-12 sm:py-24" offset={30}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center gradient-text tracking-tight">
             Projects
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {projects.map((project, index) => (
               <div
                 key={project.title}
                 className="animate-fade-in"
                 style={{ animationDelay: `${index * 200}ms` }}
               >
                 <ProjectCard {...project} />
               </div>
             ))}
           </div>
         </div>
       </ParallaxSection>

       {/* Skills Section */}
       <ParallaxSection id="skills" className="py-12 sm:py-24" offset={30}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center gradient-text tracking-tight">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <SkillCard {...skill} />
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>

             {/* Badges Section */}
       <ParallaxSection className="py-16 sm:py-32 mobile-section" offset={30}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-16 text-center gradient-text tracking-tight">
             Certifications & Badges
           </h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mobile-grid">
            {/* Cisco Ethical Hacker Badge */}
            <div className="trading-card p-6 text-center animate-fade-in">
              <a 
                href="https://www.credly.com/badges/d2801f80-4c8c-4558-8e62-b647277ee539/public_url" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform duration-300"
              >
                <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 flex items-center justify-center overflow-hidden rounded-full border-4 border-blue-500 badge-container">
                  <Image 
                    src="/badges/ethical-hacker.png" 
                    alt="Cisco Ethical Hacker Badge"
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Ethical Hacker</h3>
                <p className="text-gray-300 mb-3">Cisco Networking Academy</p>
                <div className="text-sm text-[var(--accent-blue)] hover:text-blue-300 transition-colors">
                  Verified by Credly • Click to verify
                </div>
              </a>
            </div>

                         {/* Software Developer Badge */}
             <div className="trading-card p-6 text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
               <a 
                 href="https://coursera.org/share/39989161e8c3d3197cf78299983b3970" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="block hover:scale-105 transition-transform duration-300"
               >
                 <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 flex items-center justify-center overflow-hidden rounded-full border-4 border-blue-500 badge-container">
                   <Image 
                     src="/badges/software-dev-certificate.png" 
                     alt="IBM Introduction to Software Engineering Certificate"
                     width={200}
                     height={200}
                     className="object-cover w-full h-full"
                   />
                 </div>
                 <h3 className="text-xl font-semibold mb-2 text-white">Software Developer</h3>
                 <p className="text-gray-300 mb-3">Introduction to Software Engineering</p>
                 <div className="text-sm text-[var(--accent-blue)] hover:text-blue-300 transition-colors">
                   IBM • Click to verify certificate
                 </div>
               </a>
             </div>

            {/* Web Development Badge */}
            <div className="trading-card p-6 text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <a 
                href="https://www.credly.com/badges/abdd5ae1-5595-47d6-aee7-e47bfea2ced5/public_url" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform duration-300"
              >
                                  <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 flex items-center justify-center overflow-hidden rounded-full border-4 border-green-500 badge-container">
                   <Image 
                     src="/badges/ibm-web-dev-badge.png" 
                     alt="IBM Front-End & Web Development Badge"
                     width={200}
                     height={200}
                     className="object-cover w-full h-full"
                   />
                 </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Front-End & Web Development</h3>
                <p className="text-gray-300 mb-3">IBM Developer Skills Network</p>
                <div className="text-sm text-[var(--accent-blue)] hover:text-blue-300 transition-colors">
                  Powered by Coursera • Click to verify
                </div>
              </a>
            </div>

          </div>
        </div>
      </ParallaxSection>

      {/* Contact Section */}
      <ParallaxSection id="contact" className="py-32" offset={30}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center gradient-text tracking-tight">
            Get In Touch
          </h2>
          {/* Using the client component for the contact form */}
          <ContactForm />
        </div>
      </ParallaxSection>
    </main>
  )
}