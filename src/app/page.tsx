import Navbar from '../components/Navbar'
import ProjectCard from '../components/ProjectCard'
import SkillCard from '../components/SkillCard'
import ParallaxSection from '../components/ParallaxSection'

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory management',
    imageUrl: '/projects/ecommerce.jpg',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/project',
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media management',
    imageUrl: '/projects/dashboard.jpg',
    technologies: ['React', 'TypeScript', 'D3.js', 'Firebase'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/project',
  },
  {
    title: 'AI Image Generator',
    description: 'Web app that generates images using AI models',
    imageUrl: '/projects/ai.jpg',
    technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/project',
  },
]

const skills = [
  {
    name: 'React',
    icon: '/skills/react.svg',
    proficiency: 90,
  },
  {
    name: 'TypeScript',
    icon: '/skills/typescript.svg',
    proficiency: 85,
  },
  {
    name: 'Node.js',
    icon: '/skills/nodejs.svg',
    proficiency: 80,
  },
  {
    name: 'Python',
    icon: '/skills/python.svg',
    proficiency: 85,
  },
  {
    name: 'AWS',
    icon: '/skills/aws.svg',
    proficiency: 75,
  },
  {
    name: 'Docker',
    icon: '/skills/docker.svg',
    proficiency: 70,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen text-white">
      <Navbar />
      
      {/* Hero Section */}
      <ParallaxSection offset={0} className="h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl sm:text-7xl font-bold gradient-text tracking-tight">
              Welcome to My Portfolio
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300">
              Full Stack Developer | UI/UX Designer | Tech Enthusiast
            </p>
            <div className="pt-4">
              <a
                href="#projects"
                className="trading-button inline-block text-lg px-8 py-3"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Projects Section */}
      <ParallaxSection className="py-32" offset={30}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center gradient-text tracking-tight">
            Featured Projects
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
      <ParallaxSection className="py-32" offset={30}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center gradient-text tracking-tight">
            Skills & Technologies
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

      {/* Contact Section */}
      <ParallaxSection className="py-32" offset={30}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center gradient-text tracking-tight">
            Get In Touch
          </h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-8 animate-fade-in">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="trading-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="trading-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="trading-input"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="trading-button w-full py-3 text-lg font-medium"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </ParallaxSection>
    </main>
  )
} 