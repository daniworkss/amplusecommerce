import Footer from '@/components/user/footer';
import SecondHeader from '@/components/user/second-header';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <SecondHeader/>
      
      {/* Main Content */}
      <main className="pt-18 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12 pt-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 text-lg">
              Last updated: August 15, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to AmPlus Fashion (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Please read these Terms of Service carefully. By using and accessing any of the Services, you acknowledge that you have read these Terms and understand your rights and obligations as described herein.
              </p>
            </div>

            {/* Acceptance of Terms */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 border-b border-gray-200 pb-3">
                Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            {/* Products and Services */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 border-b border-gray-200 pb-3">
                Products and Services
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-3">Product Information</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>We strive to display our products as accurately as possible</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Colors may vary slightly due to monitor settings and lighting conditions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Product availability is subject to change without notice</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>We reserve the right to limit quantities and discontinue products</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-3">Pricing</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>All prices are listed in USD and are subject to change without notice</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Prices do not include shipping, handling, or applicable taxes unless otherwise stated</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>We reserve the right to correct pricing errors</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Orders and Payment */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 border-b border-gray-200 pb-3">
                Orders and Payment
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-3">Order Processing</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>All orders are subject to acceptance and availability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>We reserve the right to refuse or cancel any order</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Order confirmation does not guarantee product availability</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-3">Payment Terms</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Payment is required at the time of purchase</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>We accept major credit cards and other specified payment methods</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>You represent that you have the legal right to use any payment method</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-3">Order Cancellation</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Orders may be cancelled before shipping</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Refunds for cancelled orders will be processed according to our refund policy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Shipping and Delivery */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 border-b border-gray-200 pb-3">
                Shipping and Delivery
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-3">Shipping Policy</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Shipping times are estimates and not guarantees</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Risk of loss transfers to you upon delivery to the carrier</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>International shipping may be subject to customs fees and import duties</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-3">Delivery Issues</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Please inspect packages upon delivery</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Report any damage or missing items within 7 days of delivery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

       

          

            {/* Intellectual Property */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 border-b border-gray-200 pb-3">
                Intellectual Property
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-3">Our Content</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>All website content, including images, text, and designs, is our property</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>You may not use our content without written permission</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Our trademarks and logos are protected intellectual property</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-3">User Content</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>You retain ownership of content you submit</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>By submitting content, you grant us a license to use it for business purposes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>You represent that you have the right to submit such content</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Privacy and Data Protection */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 border-b border-gray-200 pb-3">
                Privacy and Data Protection
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Your privacy is important to us</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Please review our Privacy Policy for information about how we collect and use your data</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>We implement reasonable security measures to protect your information</span>
                </li>
              </ul>
            </section>

            {/* Prohibited Uses */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 border-b border-gray-200 pb-3">
                Prohibited Uses
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not use our service:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>For any unlawful purpose or to solicit others to act unlawfully</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>To submit false or misleading information</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>To upload or transmit viruses or any other type of malicious code</span>
                </li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 border-b border-gray-200 pb-3">
                Limitation of Liability
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Our liability is limited to the maximum extent permitted by law</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>We are not liable for indirect, incidental, or consequential damages</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Our total liability will not exceed the amount paid for the product or service</span>
                </li>
              </ul>
            </section>

            {/* Governing Law */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 border-b border-gray-200 pb-3">
                Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms are governed by the laws of Maryland, United States. Any disputes will be resolved in the courts of Maryland, United States.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 border-b border-gray-200 pb-3">
                Changes to Terms
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>We reserve the right to modify these Terms at any time</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Changes will be effective immediately upon posting</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Continued use of our services constitutes acceptance of modified Terms</span>
                </li>
              </ul>
            </section>

            {/* Contact Section */}
            <section className="mb-10 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
                Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>AmPlus Fashion</strong></p>
                <p><strong>Email:</strong> <a href="mailto:amplus@amplusfashion.com" className="text-black underline hover:no-underline">amplus@amplusfashion.com</a></p>
                <p><strong>Address:</strong> 12809 Whiteholm Drive, Upper Marlboro, MD, 20774, US</p>
                <p><strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST</p>
              </div>
            </section>

            {/* Final Note */}
            <div className="text-center text-gray-600 italic">
              <p>By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}