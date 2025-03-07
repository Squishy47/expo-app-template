import { Code, Cpu, Database, Github } from "lucide-react";
import type React from "react";

import { Button } from "../components/shadcn/button";

export function LandingPage() {
  const getApp = () => {
    window.open(import.meta.env.VITE_APP_STORE_URL, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">
            {import.meta.env.VITE_APP_NAME}
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Docs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Pricing
                </a>
              </li>
              <li>
                <Button
                  variant="secondary"
                  className="hidden md:block ml-2 mr-2"
                  onClick={getApp}
                >
                  Get App
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI-Powered Developer Tools
          </h1>
          <p className="text-xl mb-8">
            Supercharge your development workflow with our AI solutions
          </p>
          <button
            className="bg-white text-indigo-700 font-bold py-2 px-6 rounded-full hover:bg-indigo-100 transition duration-300"
            onClick={getApp}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="w-8 h-8" />}
              title="Smart Code Completion"
              description="AI-powered code suggestions to boost your productivity"
            />
            <FeatureCard
              icon={<Database className="w-8 h-8" />}
              title="Intelligent Data Handling"
              description="Optimize your database queries with AI assistance"
            />
            <FeatureCard
              icon={<Cpu className="w-8 h-8" />}
              title="AI-Driven Testing"
              description="Automated test generation for robust applications"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>&copy; 2025 DevAI. All rights reserved.</div>
          <a
            href="https://github.com/devai"
            className="text-white hover:text-indigo-400"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
