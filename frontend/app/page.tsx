"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Lock, ShieldCheck, Coins, Zap, Users } from 'lucide-react'
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('seller')
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
          Private AI Model Marketplace
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-fade-in-up animation-delay-200">
          Securely sell and buy AI models while preserving privacy and intellectual property
        </p>
        <div className="flex justify-center gap-4 animate-fade-in-up animation-delay-400">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push('/model-upload')}>
            List Your Model
          </Button>
          <Button size="lg" variant="outline" onClick={() => router.push('/marketplace')}>
            Explore Models
          </Button>
        </div>
      </header>

      {/* Key Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Lock, title: "Privacy-Preserving", description: "Keep your model architecture and weights private with Sapphire's encryption" },
            { icon: Zap, title: "Try Before You Buy", description: "Test models with sample data before making a purchase" },
            { icon: Coins, title: "Data Monetization", description: "Integrate with Ocean Protocol for seamless data monetization" },
          ].map((feature, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <feature.icon className="w-12 h-12 mb-4 text-blue-500" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="seller">For Sellers</TabsTrigger>
            <TabsTrigger value="buyer">For Buyers</TabsTrigger>
          </TabsList>
          <TabsContent value="seller" className="mt-6">
            <ol className="space-y-4">
              {[
                "Encrypt your model using Sapphire's technology",
                "Set pricing and usage terms",
                "Deploy your model on the Oasis Sapphire network",
                "Receive payments securely as buyers use your model"
              ].map((step, index) => (
                <li key={index} className="flex items-center gap-4">
                  <Badge variant="secondary" className="h-8 w-8 rounded-full p-2 font-bold">
                    {index + 1}
                  </Badge>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </TabsContent>
          <TabsContent value="buyer" className="mt-6">
            <ol className="space-y-4">
              {[
                "Browse available models in the marketplace",
                "Test models with sample data",
                "Purchase access to desired models",
                "Use models securely without compromising privacy"
              ].map((step, index) => (
                <li key={index} className="flex items-center gap-4">
                  <Badge variant="secondary" className="h-8 w-8 rounded-full p-2 font-bold">
                    {index + 1}
                  </Badge>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </TabsContent>
        </Tabs>
      </section>

      {/* Trust Indicators */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Trusted by Industry Leaders</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {['Oasis Labs', 'Ocean Protocol', 'AI Research Institute', 'Tech Innovations Inc.', 'Data Privacy Co.'].map((company, index) => (
            <Badge key={index} variant="outline" className="text-lg py-2 px-4">
              {company}
            </Badge>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="bg-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-3xl">Ready to revolutionize AI model trading?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-lg">Join our platform today and experience the future of secure AI model marketplace.</p>
            <Button size="lg" variant="secondary" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2023 Private AI Model Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}