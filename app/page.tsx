import { BarChart, BookOpen, CheckCircle, GraduationCap, Star, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-100 -z-10"></div>
          <div className="absolute inset-y-0 right-0 -z-10 w-[40%] bg-emerald-50 rounded-l-[80px] hidden lg:block"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-8 max-w-2xl">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Master Your English</span>
                  <span className="block text-emerald-600">for ESOL Exams</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl">
                  Practise with our comprehensive collection of ESOL exam materials. Get instant feedback and improve
                  your skills with personalised learning paths.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/test/L2/writing/A1"
                    className="rounded-full bg-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:bg-emerald-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 text-center"
                  >
                    Start Practising Now
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="rounded-full bg-white px-8 py-4 text-lg font-bold text-emerald-600 shadow-lg hover:bg-gray-50 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="relative mx-auto lg:ml-auto">
                <div className="absolute -inset-4 bg-emerald-200 rounded-3xl rotate-3 -z-10"></div>
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Students practising for ESOL exams"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                <h3 className="text-4xl font-extrabold text-emerald-600 mb-2">1000+</h3>
                <p className="text-base font-medium text-gray-700">Practice Tests</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                <h3 className="text-4xl font-extrabold text-emerald-600 mb-2">50,000+</h3>
                <p className="text-base font-medium text-gray-700">Active Students</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                <h3 className="text-4xl font-extrabold text-emerald-600 mb-2">95%</h3>
                <p className="text-base font-medium text-gray-700">Pass Rate</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                <h3 className="text-4xl font-extrabold text-emerald-600 mb-2">24/7</h3>
                <p className="text-base font-medium text-gray-700">Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Features Designed for ESOL Students</h2>
              <p className="text-xl text-gray-600">Everything you need to prepare for your ESOL exams in one place.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-transform">
                <div className="bg-emerald-100 rounded-2xl p-4 inline-block mb-6">
                  <BookOpen className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive Practice</h3>
                <p className="text-gray-600">
                  Access a wide range of practice tests covering all ESOL exam formats and difficulty levels.
                </p>
              </div>
              <div className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-transform">
                <div className="bg-emerald-100 rounded-2xl p-4 inline-block mb-6">
                  <BarChart className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Feedback</h3>
                <p className="text-gray-600">
                  Receive detailed feedback on your performance with suggestions for improvement.
                </p>
              </div>
              <div className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-transform">
                <div className="bg-emerald-100 rounded-2xl p-4 inline-block mb-6">
                  <Users className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalised Learning</h3>
                <p className="text-gray-600">Get customised study plans based on your strengths and weaknesses.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">
                Simple steps to improve your English skills and pass your ESOL exams.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="relative mx-auto mb-8">
                  <div className="absolute inset-0 bg-emerald-200 rounded-full -rotate-6"></div>
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600 text-white text-3xl font-extrabold mx-auto">
                    1
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h3>
                <p className="text-gray-600">
                  Create your account and tell us about your learning goals and current level.
                </p>
              </div>
              <div className="text-center">
                <div className="relative mx-auto mb-8">
                  <div className="absolute inset-0 bg-emerald-200 rounded-full -rotate-6"></div>
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600 text-white text-3xl font-extrabold mx-auto">
                    2
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Practise</h3>
                <p className="text-gray-600">
                  Take practice tests that match your level and get instant feedback on your performance.
                </p>
              </div>
              <div className="text-center">
                <div className="relative mx-auto mb-8">
                  <div className="absolute inset-0 bg-emerald-200 rounded-full -rotate-6"></div>
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600 text-white text-3xl font-extrabold mx-auto">
                    3
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Improve</h3>
                <p className="text-gray-600">Follow your personalised study plan and track your progress over time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">What Our Students Say</h2>
              <p className="text-xl text-gray-600">
                Hear from students who have improved their English skills with our platform.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl p-8 relative">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-emerald-600 text-white p-4 rounded-full shadow-lg">
                  <Star className="h-6 w-6 fill-current" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <q className="text-gray-700 mb-8 text-lg">
                  This platform helped me pass my ESOL exam with confidence. The practice tests were very similar to the
                  actual exam.
                </q>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-emerald-100 p-4 h-14 w-14 flex items-center justify-center">
                    <span className="text-emerald-600 font-bold text-xl">MR</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Maria Rodriguez</p>
                    <p className="text-gray-600">B2 Level Student</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-xl p-8 relative">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-emerald-600 text-white p-4 rounded-full shadow-lg">
                  <Star className="h-6 w-6 fill-current" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <q className="text-gray-700 mb-8 text-lg">
                  The feedback I received after each practice test was incredibly helpful. I could see my progress week
                  by week.
                </q>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-emerald-100 p-4 h-14 w-14 flex items-center justify-center">
                    <span className="text-emerald-600 font-bold text-xl">JK</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Jun Kim</p>
                    <p className="text-gray-600">C1 Level Student</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-xl p-8 relative">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-emerald-600 text-white p-4 rounded-full shadow-lg">
                  <Star className="h-6 w-6 fill-current" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <q className="text-gray-700 mb-8 text-lg">
                  As a beginner, I was worried about learning English, but this platform made it easy and enjoyable.
                </q>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-emerald-100 p-4 h-14 w-14 flex items-center justify-center">
                    <span className="text-emerald-600 font-bold text-xl">AP</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Ahmed Patel</p>
                    <p className="text-gray-600">A2 Level Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600">Choose the plan that fits your learning needs.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                  <p className="text-gray-600 mb-6">For casual learners</p>
                  <div className="text-5xl font-extrabold text-gray-900 mb-6">
                    $9.99
                    <span className="text-xl font-normal text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {['Access to 100+ practice tests', 'Basic feedback', 'Email support'].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-8 pb-8">
                  <Link
                    href="/signup"
                    className="block w-full rounded-full bg-emerald-600 px-8 py-4 text-center text-lg font-bold text-white shadow-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform relative">
                <div className="absolute top-0 inset-x-0 bg-emerald-600 text-white text-center py-2 font-bold">
                  MOST POPULAR
                </div>
                <div className="p-8 pt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                  <p className="text-gray-600 mb-6">For dedicated students</p>
                  <div className="text-5xl font-extrabold text-gray-900 mb-6">
                    $19.99
                    <span className="text-xl font-normal text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Access to 500+ practice tests',
                      'Detailed feedback & analysis',
                      'Personalised study plan',
                      'Priority email support',
                      'Progress tracking'
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-8 pb-8">
                  <Link
                    href="/signup"
                    className="block w-full rounded-full bg-emerald-600 px-8 py-4 text-center text-lg font-bold text-white shadow-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Ultimate</h3>
                  <p className="text-gray-600 mb-6">For exam preparation</p>
                  <div className="text-5xl font-extrabold text-gray-900 mb-6">
                    $29.99
                    <span className="text-xl font-normal text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Access to all practice tests',
                      'Advanced feedback & analysis',
                      'Personalised study plan',
                      '1-on-1 tutor sessions',
                      '24/7 priority support',
                      'Mock exam simulations'
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-8 pb-8">
                  <Link
                    href="/signup"
                    className="block w-full rounded-full bg-emerald-600 px-8 py-4 text-center text-lg font-bold text-white shadow-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-extrabold mb-6">Ready to Improve Your English?</h2>
              <p className="text-xl mb-10 text-emerald-100">
                Join thousands of students who have passed their ESOL exams with our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/signup"
                  className="rounded-full bg-white px-8 py-4 text-lg font-bold text-emerald-600 shadow-xl hover:bg-gray-100 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
                >
                  Start Your Free Trial
                </Link>
                <Link
                  href="/demo"
                  className="rounded-full bg-transparent border-2 border-white px-8 py-4 text-lg font-bold text-white shadow-xl hover:bg-white/10 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-emerald-400" />
                <span className="text-2xl font-bold">ESOL Practise</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                Helping ESOL students achieve their language learning goals through comprehensive practice and
                personalised feedback.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold mb-4">Platform</h3>
              <ul className="space-y-3">
                {['Features', 'How It Works', 'Pricing', 'FAQ'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-3">
                {['About Us', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-3">
                {['Terms', 'Privacy', 'Cookies'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} ESOL Practise. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg
                  role="graphics-symbol"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg
                  role="graphics-symbol"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  role="graphics-symbol"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
