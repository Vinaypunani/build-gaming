"use client";

import Layout from '@/components/layout/Layout';
import { Mail, MapPin, Phone, User } from 'lucide-react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <Layout>
      <section className="py-16 bg-background min-h-screen">
        <div className="container-custom max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-primary">About Us</h1>
          <p className="text-gray-400 mb-8 text-lg">
            Welcome to <span className="text-primary font-semibold">Build Gaming</span>! We are passionate about empowering gamers and creators with the best custom PC builds and components. Our mission is to make high-performance computing accessible, reliable, and exciting for everyone in India.
          </p>

          {/* Flex row: image left, info right */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-8">
            {/* Big Founder/Company Image */}
            <div className="flex-shrink-0">
              <Image
                src="/images/about.webp"
                alt="Vinay Punani - Founder"
                width={320}
                height={320}
                className="rounded-2xl border-4 border-primary shadow-xl object-cover bg-card"
                priority
              />
            </div>
            {/* Info Card */}
            <div className="flex-1 w-full">
              <div className="bg-card border border-border rounded-lg p-8 space-y-8">
                <div className="flex items-center gap-4">
                  <User className="text-primary" />
                  <div>
                    <div className="text-xs text-gray-400">Founder</div>
                    <div className="font-semibold text-xl text-foreground">Vinay Punani</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-primary" />
                  <div>
                    <div className="text-xs text-gray-400">Address</div>
                    <div className="font-medium text-foreground">Surendranagar, Gujarat, India</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-primary" />
                  <div>
                    <div className="text-xs text-gray-400">Mobile</div>
                    <div className="font-medium text-foreground">+91 9054138234</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-primary" />
                  <div>
                    <div className="text-xs text-gray-400">Email</div>
                    <a href="mailto:vinaypunani@gmail.com" className="font-medium text-primary hover:underline">vinaypunani@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Build Gaming. All rights reserved.
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage; 