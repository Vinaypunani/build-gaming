"use client";

import Layout from '@/components/layout/Layout';
import { Mail, MapPin, Phone, User } from 'lucide-react';

const ContactPage = () => {
  return (
    <Layout>
      <section className="py-16 bg-background min-h-screen">
        <div className="container-custom max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-primary">Contact Us</h1>
          <p className="text-gray-400 mb-8 text-lg">
            Have a question, need support, or want to collaborate? Reach out to us using the form below or via our contact details.
          </p>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Contact Info & Form */}
            <div className="flex flex-col md:flex-row gap-10 w-full">
              <div className="flex-1 space-y-8">
                <div className="bg-card border border-border rounded-lg p-6 space-y-6 mb-6">
                  <div className="flex items-center gap-4">
                    <User className="text-primary" />
                    <div>
                      <div className="text-xs text-gray-400">Founder</div>
                      <div className="font-semibold text-lg text-foreground">Vinay Punani</div>
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

              {/* Contact Form */}
              <div className="flex-1">
                <form className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Name</label>
                    <input type="text" className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Message</label>
                    <textarea className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" rows={4} required />
                  </div>
                  <button type="submit" className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary-dark transition-colors">Send Message</button>
                </form>
              </div>
            </div>
          </div>

          {/* Google Map at the bottom */}
          <div className="w-full min-h-[350px] rounded-lg overflow-hidden border border-border shadow-md mt-10">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.964073964839!2d71.6532550750426!3d22.72707377940137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f5a1e2e2b2e2b%3A0x8e2b2e2b2e2b2e2b!2sSurendranagar%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 350 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage; 