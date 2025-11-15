// src/app/page.tsx - Updated Landing Page with New Sections
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg font-bold text-xl">
                🚀 EduRescue
              </div>
              <div className="hidden md:flex items-center space-x-8 ml-8">
                <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">ফিচারস</a>
                <a href="#for-whom" className="text-gray-700 hover:text-blue-600 font-medium">কার জন্য</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">কিভাবে কাজ করে</a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium">প্রাইসিং</a>
                <a href="#trust" className="text-gray-700 hover:text-blue-600 font-medium">ট্রাস্ট & সেফটি</a>
                <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium">রিভিউ</a>
                <a href="#faq" className="text-gray-700 hover:text-blue-600 font-medium">FAQ</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/signin"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                লগইন
              </Link>
              <Link
                href="/auth/signin"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition"
              >
                ফ্রি ট্রায়াল শুরু করুন
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Payment Strip */}
      <section className="relative overflow-hidden">
        {/* Payment Security Strip */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-6 text-sm font-medium">
              <div className="flex items-center space-x-2">
                <span>🔒</span>
                <span>১০০% সুরক্ষিত পেমেন্ট</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>💳</span>
                <span>bKash, Nagad, Rocket একসেপ্টেড</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🔄</span>
                <span>সেশন不满意 হলে ফুল রিফান্ড</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            বাংলাদেশের প্রথম
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}২৪/৭ একাডেমিক ইমার্জেন্সি সার্ভিস
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            এক্কেবারে যেকোনো সময়, যেকোনো একাডেমিক সমস্যার সমাধান পেতে
            <span className="font-semibold text-blue-600"> ৫-মিনিটের মধ্যে এক্সপার্ট হেল্প</span>।
            এক্সাম, অ্যাসাইনমেন্ট, প্রজেক্ট - সব ধরনের ইমার্জেন্সিতে আমরা আছি আপনার সাথে।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/sessions/emergency"
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
            >
              🚨 ইমার্জেন্সি হেল্প নিন
            </Link>
            <Link
              href="/auth/signin"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition"
            >
              📚 ফ্রি অ্যাকাউন্ট তৈরি করুন
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">৫ মিনিট</div>
              <div className="text-gray-600">গড় রেসপন্স টাইম</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">২০০+</div>
              <div className="text-gray-600">ভেরিফাইড এক্সপার্ট</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">১০,০০০+</div>
              <div className="text-gray-600">সেশন কমপ্লিটেড</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">৪.৯/৫</div>
              <div className="text-gray-600">স্টুডেন্ট রেটিং</div>
            </div>
          </div>
        </div>
      </section>

      {/* কার জন্য Section */}
      <section id="for-whom" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              EduRescue কার জন্য?
            </h2>
            <p className="text-gray-600 text-lg">
              বাংলাদেশের প্রতিটি শিক্ষার্থী এবং অভিভাবকের জন্য তৈরি
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* School Students */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-6 border border-blue-200 text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🎒
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">স্কুল শিক্ষার্থীদের জন্য</h3>
              <p className="text-gray-600 mb-4">
                ক্লাস ৬-১২ পর্যন্ত সকল শিক্ষার্থী। এসএসসি এবং এইচএসসি পরীক্ষার্থীদের জন্য বিশেষ সহায়তা।
              </p>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>✅ সকল বিষয়ের সমস্যা সমাধান</li>
                <li>✅ এক্সাম প্রিপারেশন হেল্প</li>
                <li>✅ হোমওয়ার্ক এবং অ্যাসাইনমেন্ট</li>
                <li>✅ কনসেপ্ট ক্লিয়ারিং</li>
              </ul>
            </div>

            {/* College & University */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 border border-purple-200 text-center">
              <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🎓
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">কলেজ ও ইউনিভার্সিটি</h3>
              <p className="text-gray-600 mb-4">
                বিশ্ববিদ্যালয় ভর্তি পরীক্ষা, ইঞ্জিনিয়ারিং, মেডিকেল, এবং অন্যান্য উচ্চশিক্ষা পর্যায়ের শিক্ষার্থী।
              </p>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>✅ এডভান্সড সাবজেক্ট হেল্প</li>
                <li>✅ প্রজেক্ট এবং অ্যাসাইনমেন্ট</li>
                <li>✅ প্রোগ্রামিং এবং কোডিং</li>
                <li>✅ রিসার্চ এবং থিসিস</li>
              </ul>
            </div>

            {/* Parents */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                👨‍👩‍👧‍👦
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">অভিভাবকদের জন্য</h3>
              <p className="text-gray-600 mb-4">
                সন্তানের পড়ালেখায় সাহায্য করতে চান কিন্তু সময় বা বিষয়জ্ঞান নেই? আমরা আছি আপনাদের জন্য।
              </p>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>✅ সন্তানের প্রোগ্রেস মনিটরিং</li>
                <li>✅ নিরাপদ এবং ভেরিফাইড এক্সপার্ট</li>
                <li>✅ সেশন রেকর্ডিং এক্সেস</li>
                <li>✅ পারেন্টাল কন্ট্রোল</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              কেন EduRescue বেছে নিবেন?
            </h2>
            <p className="text-gray-600 text-lg">
              বাংলাদেশের শিক্ষার্থীদের জন্য তৈরি বিশেষ ফিচারসমূহ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-6 border border-red-200">
              <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                🚨
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">২৪/৭ ইমার্জেন্সি হেল্প</h3>
              <p className="text-gray-600 mb-4">
                রাত ২টায় এক্সাম প্রিপারেশনে সমস্যা? সকাল ৮টায় অ্যাসাইনমেন্ট জমা দিতে হবে?
                আমরা আছি ২৪/৭, শুধু ৫-মিনিটের মধ্যে কানেক্ট হোন।
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✅ ৫-মিনিট এক্সপার্ট কানেকশন</li>
                <li>✅ সকল একাডেমিক সাবজেক্ট</li>
                <li>✅ প্রায়োরিটি সাপোর্ট</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-6 border border-blue-200">
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                👨‍🏫
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ভেরিফাইড বাংলাদেশী এক্সপার্ট</h3>
              <p className="text-gray-600 mb-4">
                শুধুমাত্র বাংলাদেশী কারিকুলামে এক্সপার্ট এবং ভেরিফাইড টিচারদের থেকে সাহায্য পান।
                বুয়েট, ঢাকা ইউনিভার্সিটি, মেডিকেল কলেজের এক্সপার্ট।
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✅ বাংলাদেশী কারিকুলাম স্পেশালিস্ট</li>
                <li>✅ ৪.৫+ রেটেড এক্সপার্ট</li>
                <li>✅ বাংলা এবং ইংরেজি সাপোর্ট</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200">
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                💰
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">সাশ্রয়ী মূল্যে</h3>
              <p className="text-gray-600 mb-4">
                ইমার্জেন্সি হেল্প শুরু মাত্র ৳৯৯ থেকে। কোনো hidden charge নেই।
                সেশন不满意 হলে ফুল রিফান্ড।
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✅ ইমার্জেন্সি সেশন: ৳৯৯</li>
                <li>✅ শিডিউল্ড সেশন: ৳১৫৯-৩৯৯</li>
                <li>✅ সেশন不满意 হলে ফুল রিফান্ড</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section id="trust" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🔒 আপনার নিরাপত্তা是我们的 অগ্রাধিকার
            </h2>
            <p className="text-gray-600 text-lg">
              আমরা আপনার গোপনীয়তা এবং নিরাপত্তাকে সর্বোচ্চ গুরুত্ব দেই
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Safety 1 */}
            <div className="bg-white rounded-2xl border border-blue-200 p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                👨‍🎓
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">ভেরিফাইড এক্সপার্ট</h3>
              <p className="text-gray-600 text-sm">
                প্রতিটি এক্সপার্টের ব্যাকগ্রাউন্ড চেক এবং verification করা হয়
              </p>
            </div>

            {/* Safety 2 */}
            <div className="bg-white rounded-2xl border border-green-200 p-6 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                📹
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">সেশন রেকর্ডিং</h3>
              <p className="text-gray-600 text-sm">
                সব সেশন রেকর্ড করা হয় quality এবং safety নিশ্চিত করতে
              </p>
            </div>

            {/* Safety 3 */}
            <div className="bg-white rounded-2xl border border-purple-200 p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🔐
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">এন্ড-টু-এন্ড এনক্রিপশন</h3>
              <p className="text-gray-600 text-sm">
                আপনার সকল ডেটা এবং conversation সুরক্ষিত
              </p>
            </div>

            {/* Safety 4 */}
            <div className="bg-white rounded-2xl border border-red-200 p-6 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">দ্রুত রেসপন্স</h3>
              <p className="text-gray-600 text-sm">
                কোনো সমস্যা হলে ২৪/৭ সাপোর্ট টিম সাথে联系 করুন
              </p>
            </div>
          </div>

          {/* Safety Guarantee */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">💎 আমাদের নিরাপত্তা গ্যারান্টি</h3>
            <p className="text-blue-100 text-lg mb-6">
              আমরা আপনার সন্তানের নিরাপত্তা এবং academic growth কে সর্বোচ্চ গুরুত্ব দেই।
              কোনো সমস্যা হলে立即 আমাদের সাথে联系 করুন।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-2">🛡️</div>
                <p>Parental Monitoring</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-2">📞</div>
                <p>24/7 Support</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-2">💰</div>
                <p>Money Back Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              কিভাবে কাজ করে?
            </h2>
            <p className="text-gray-600 text-lg">
              মাত্র ৩টি সহজ স্টেপে পান এক্সপার্ট হেল্প
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                ১
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">বিষয় সিলেক্ট করুন</h3>
              <p className="text-gray-600">
                আপনার ইমার্জেন্সি বিষয় এবং সমস্যার ধরন সিলেক্ট করুন। স্কুল, কলেজ, ইউনিভার্সিটি - সব লেভেলের জন্য।
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                ২
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">পেমেন্ট করুন</h3>
              <p className="text-gray-600">
                bKash, Nagad, বা কার্ডের মাধ্যমে সহজেই পেমেন্ট করুন। ইমার্জেন্সি সেশন মাত্র ৳৯৯।
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                ৩
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">এক্সপার্ট সাথে কানেক্ট হোন</h3>
              <p className="text-gray-600">
                ৫-মিনিটের মধ্যে এক্সপার্ট সাথে কানেক্ট হোন। লাইভ চ্যাট, ভয়েস কল, বা ভিডিও কল এর মাধ্যমে সমাধান পান।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              সাশ্রয়ী প্রাইসিং প্ল্যান
            </h2>
            <p className="text-gray-600 text-lg">
              আপনার প্রয়োজন অনুযায়ী প্ল্যান সিলেক্ট করুন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">ফ্রি</h3>
              <div className="text-3xl font-bold text-gray-900 mb-6">
                ৳০<span className="text-sm text-gray-600">/মাস</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  বেসিক এআই অ্যাসিসটেন্ট
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  সীমিত রিসোর্স এক্সেস
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  কমিউনিটি ফোরাম
                </li>
              </ul>
              <Link
                href="/auth/signin"
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition block text-center"
              >
                শুরু করুন
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl text-white p-6 relative transform scale-105">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  সর্বাধিক জনপ্রিয়
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4">প্রো</h3>
              <div className="text-3xl font-bold mb-6">
                ৳৫৯৯<span className="text-lg opacity-90">/মাস</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-green-300 mr-2">✓</span>
                  ২টি ইমার্জেন্সি সেশন
                </li>
                <li className="flex items-center">
                  <span className="text-green-300 mr-2">✓</span>
                  আনলিমিটেড শিডিউল্ড সেশন
                </li>
                <li className="flex items-center">
                  <span className="text-green-300 mr-2">✓</span>
                  প্রিমিয়াম এআই অ্যাসিসটেন্ট
                </li>
                <li className="flex items-center">
                  <span className="text-green-300 mr-2">✓</span>
                  সব রিসোর্স এক্সেস
                </li>
              </ul>
              <Link
                href="/auth/signin"
                className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition block text-center"
              >
                ৭-দিন ফ্রি ট্রায়াল
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">প্রিমিয়াম</h3>
              <div className="text-3xl font-bold text-gray-900 mb-6">
                ৳৯৯৯<span className="text-sm text-gray-600">/মাস</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  আনলিমিটেড ইমার্জেন্সি সেশন
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  ভিআইপি সাপোর্ট
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  এডভান্সড অ্যানালিটিক্স
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  পার্সোনালাইজড লার্নিং পাথ
                </li>
              </ul>
              <Link
                href="/auth/signin"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition block text-center"
              >
                শুরু করুন
              </Link>
            </div>
          </div>

          {/* Payment Logos Strip */}
          <div className="mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                💳 সহজ এবং সুরক্ষিত পেমেন্ট
              </h3>
              <p className="text-gray-600">আপনার পছন্দের payment method ব্যবহার করুন</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="bg-white p-4 rounded-xl border border-green-200 shadow-sm">
                <div className="text-3xl font-bold text-green-600">bKash</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
                <div className="text-3xl font-bold text-blue-600">Nagad</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-sm">
                <div className="text-3xl font-bold text-purple-600">Rocket</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm">
                <div className="text-2xl font-bold text-orange-600">SSLCOMMERZ</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-xl font-bold text-gray-700">কার্ড/ব্যাংক</div>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                🔒 সকল transaction SSL encrypted এবং ১০০% সুরক্ষিত
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Bangladeshi Parents & Students Focus */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ❓ প্রায়ই জিজ্ঞাসিত প্রশ্ন
            </h2>
            <p className="text-gray-600 text-lg">
              বাংলাদেশী parents এবং students এর common concerns
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl border border-blue-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                👨‍👩‍👧‍👦 অভিভাবকদের জন্য: আমার সন্তানের নিরাপত্তা কিভাবে নিশ্চিত করবেন?
              </h3>
              <p className="text-gray-600">
                আমরা multiple layer security system follow করি:
                • সকল experts verified এবং background checked
                • সকল session recorded এবং monitored
                • Parents can monitor sessions real-time
                • Emergency reporting system available
                • কোনো inappropriate behavior হলে instant ban
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl border border-green-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                💰 পেমেন্ট সম্পর্কে: bKash/Nagad以外 অন্য payment option আছে?
              </h3>
              <p className="text-gray-600">
                হ্যাঁ! আমরা সকল Bangladeshi payment method support করি:
                • bKash (সবচেয়ে জনপ্রিয়)
                • Nagad
                • Rocket
                • Bank transfer
                • Credit/Debit cards (SSLCOMMERZ এর মাধ্যমে)
                • সকল transaction ১০০% secure এবং encrypted
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl border border-purple-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                🕒 রাতের বেলায়真的 help পাবো? সত্যি ২৪/৭ service?
              </h3>
              <p className="text-gray-600">
                Absolutely! আমরা real 24/7 service দেই:
                • রাত ২টা, সকাল ৪টা - যেকোনো সময়
                • Emergency session: ৫-minute এর মধ্যে expert connect
                • ২০০+ verified experts different time zones এ available
                • Exam season এ extra experts add করা হয়
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl border border-red-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                🎓 বাংলাদেশী curriculum (SSC/HSC) এর জন্য specialized help পাবো?
              </h3>
              <p className="text-gray-600">
                হ্যাঁ! এটাই আমাদের USP:
                • শুধুমাত্র Bangladeshi curriculum experts
                • SSC/HSC specialized teachers
                • Bangladeshi context এবং examples
                • বাংলা এবং English mixed teaching
                • Board exam pattern oriented help
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-2xl border border-orange-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                🔄不满意 হলে refund পাবো? কীভাবে কাজ করে?
              </h3>
              <p className="text-gray-600">
                আমরা ১০০% satisfaction guarantee দেই:
                • Session不满意 হলে full refund
                • ১৫-minute এর মধ্যে problem solve না হলে refund
                • Expert connect না হলে instant refund
                • Automated refund system - কোনো question নেই
                • bKash/Nagad এ ২৪-hour এর মধ্যে refund
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-2xl border border-indigo-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                📚 শুধু emergencyই নাকি regular study-ও help করবেন?
              </h3>
              <p className="text-gray-600">
                আমরা both service দেই:
                • Emergency help: ৫-minute, ৳৯৯
                • Regular scheduled sessions: weekly/monthly
                • Subject-wise package available
                • Group study sessions (cost effective)
                • Long-term learning path creation
              </p>
            </div>
          </div>

          {/* Still Have Questions */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">💬 Still Have Questions?</h3>
            <p className="text-blue-100 text-lg mb-6">
              আমাদের support team随时 আপনার প্রশ্নের উত্তর দিতে প্রস্তুত
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                📞 Contact Support
              </Link>
              <Link
                href="/auth/signin"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                🚀 Free Trial Start করুন
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              আমাদের শিক্ষার্থীদের কথা
            </h2>
            <p className="text-gray-600 text-lg">
              ১০,০০০+ শিক্ষার্থী তাদের একাডেমিক সমস্যার সমাধান পেয়েছেন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  রি
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">রিয়া ইসলাম</h4>
                  <p className="text-gray-600 text-sm">ঢাকা কলেজ, এইচএসসি</p>
                </div>
              </div>
              <p className="text-gray-600">
                "ফাইনাল এক্সামের আগের রাতে ফিজিক্সের একটা কনসেপ্ট ক্লিয়ার করতে পারছিলাম না।
                EduRescue-এ ১০ মিনিটের মধ্যে এক্সপার্ট পেয়ে গেলাম! স্যার খুব সুন্দর করে বুঝিয়ে দিলেন।"
              </p>
              <div className="flex text-yellow-400 mt-3">
                {"★".repeat(5)}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  স
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">সজল আহমেদ</h4>
                  <p className="text-gray-600 text-sm">বুয়েট, ইইই</p>
                </div>
              </div>
              <p className="text-gray-600">
                "প্রোজেক্ট সাবমিশনের আগের দিন কোডিং এ সমস্যা হচ্ছিল।
                midnight-এ EduRescue-এর এক্সপার্ট সাহায্য করলেন।
                না হলে প্রোজেক্ট সাবমিট করতে পারতাম না।"
              </p>
              <div className="flex text-yellow-400 mt-3">
                {"★".repeat(5)}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  আ
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">আয়েশা সিদ্দিকা</h4>
                  <p className="text-gray-600 text-sm">মেডিকেল কলেজ</p>
                </div>
              </div>
              <p className="text-gray-600">
                "বায়োলজির জটিল টপিকগুলো বুঝতে সমস্যা হচ্ছিল।
                EduRescue-এর এক্সপার্ট ম্যাম diagrams এঁকে এঁকে বুঝিয়ে দিলেন।
                এখন নিজে নিজেই পড়া বুঝতে পারি।"
              </p>
              <div className="flex text-yellow-400 mt-3">
                {"★".repeat(5)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            আজই শুরু করুন আপনার একাডেমিক সাফল্যের যাত্রা
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            join করেছেন ৫০,০০০+ বাংলাদেশী শিক্ষার্থী। আপনারও একাডেমিক সমস্যার সমাধান পেতে আজই শুরু করুন।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sessions/emergency"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
            >
              🚨 ইমার্জেন্সি হেল্প নিন
            </Link>
            <Link
              href="/auth/signin"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition"
            >
              📚 ফ্রি অ্যাকাউন্ট তৈরি করুন
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg font-bold text-xl mb-4">
                🚀 EduRescue
              </div>
              <p className="text-gray-400">
                বাংলাদেশের প্রথম ২৪/৭ একাডেমিক ইমার্জেন্সি সার্ভিস
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">লিংকস</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">ফিচারস</a></li>
                <li><a href="#for-whom" className="hover:text-white">কার জন্য</a></li>
                <li><a href="#how-it-works" className="hover:text-white">কিভাবে কাজ করে</a></li>
                <li><a href="#pricing" className="hover:text-white">প্রাইসিং</a></li>
                <li><a href="#trust" className="hover:text-white">ট্রাস্ট & সেফটি</a></li>
                <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">সাপোর্ট</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">হেল্প সেন্টার</a></li>
                <li><a href="#" className="hover:text-white">কন্টাক্ট আস</a></li>
                <li><a href="#" className="hover:text-white">প্রাইভেসি পলিসি</a></li>
                <li><a href="#" className="hover:text-white">টার্মস অফ সার্ভিস</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">কন্টাক্ট</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📧 hello@edurescue.com</li>
                <li>📞 +880 1XXX-XXXXXX</li>
                <li>📍 ঢাকা, বাংলাদেশ</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EduRescue. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}