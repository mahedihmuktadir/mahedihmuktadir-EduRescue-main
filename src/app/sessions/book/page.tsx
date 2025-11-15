// src/app/sessions/book/page.tsx - COMPLETE BOOKING SYSTEM
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SessionBooking() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedSubject, setSelectedSubject] = useState("")
    const [selectedExpert, setSelectedExpert] = useState<any>(null)
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [selectedDuration, setSelectedDuration] = useState(60)
    const [showExpertModal, setShowExpertModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterRating, setFilterRating] = useState(0)
    const [filterOnline, setFilterOnline] = useState(false)

    // Mock Data
    const subjects = [
        "Math", "Physics", "Chemistry", "Biology", "English", "Bangla",
        "ICT", "Accounting", "Finance", "Marketing", "C Programming", "Higher Math"
    ]

    const experts = [
        {
            id: 1,
            name: "আরিফ স্যার",
            subject: "Math",
            rating: 4.9,
            experience: "৪ বছর",
            tags: ["SSC", "HSC", "University"],
            bio: "বুয়েটের প্রাক্তন শিক্ষার্থী, গণিতে বিশেষ দক্ষতা",
            status: "online",
            fee: 199,
            education: "BSc in Electrical Engineering, BUET",
            expertise: ["Algebra", "Calculus", "Geometry"],
            feedback: "স্যার খুব সুন্দর করে বুঝান",
            sessions: 245
        },
        {
            id: 2,
            name: "রিয়া ম্যাডাম",
            subject: "English",
            rating: 4.8,
            experience: "৩ বছর",
            tags: ["SSC", "HSC", "Admission"],
            bio: "ইংরেজি ভাষায় উচ্চতর ডিগ্রীধারী",
            status: "online",
            fee: 179,
            education: "MA in English, University of Dhaka",
            expertise: ["Grammar", "Writing", "Speaking"],
            feedback: "ভালো ইংরেজি শেখান",
            sessions: 189
        },
        {
            id: 3,
            name: "নাজিয়া ম্যাডাম",
            subject: "Physics",
            rating: 4.7,
            experience: "৫ বছর",
            tags: ["HSC", "University", "Engineering"],
            bio: "পদার্থবিজ্ঞানে বিশেষজ্ঞ",
            status: "offline",
            fee: 219,
            education: "MSc in Physics, RU",
            expertise: ["Mechanics", "Electronics", "Thermodynamics"],
            feedback: "জটিল বিষয় সহজে বুঝান",
            sessions: 167
        }
    ]

    const timeSlots = [
        "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM",
        "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
        "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM",
        "03:00 PM", "03:15 PM", "03:30 PM", "03:45 PM",
        "08:00 PM", "08:15 PM", "08:30 PM", "08:45 PM",
        "09:00 PM", "09:15 PM", "09:30 PM", "09:45 PM"
    ]

    const durations = [
        { minutes: 30, price: 99, label: "৩০ মিনিট", recommended: false },
        { minutes: 60, price: 199, label: "৬০ মিনিট", recommended: true },
        { minutes: 90, price: 299, label: "৯০ মিনিট", recommended: false },
        { minutes: 120, price: 399, label: "১২০ মিনিট", recommended: false }
    ]

    // Filter experts based on selections
    const filteredExperts = experts.filter(expert => {
        if (selectedSubject && expert.subject !== selectedSubject) return false
        if (searchQuery && !expert.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
        if (filterRating > 0 && expert.rating < filterRating) return false
        if (filterOnline && expert.status !== "online") return false
        return true
    })

    // Calculate price
    const selectedDurationObj = durations.find(d => d.minutes === selectedDuration)
    const basePrice = selectedDurationObj?.price || 199
    const serviceFee = Math.round(basePrice * 0.05)
    const totalPrice = basePrice + serviceFee

    const handleExpertSelect = (expert: any) => {
        setSelectedExpert(expert)
        setCurrentStep(2)
    }

    const handleBookingConfirm = () => {
        setCurrentStep(3)
    }

    const handlePayment = () => {
        // Mock payment processing
        setCurrentStep(4)
    }

    const getSubjectColor = (subject: string) => {
        const colors: any = {
            Math: "bg-blue-100 text-blue-800 border-blue-300",
            Physics: "bg-purple-100 text-purple-800 border-purple-300",
            Chemistry: "bg-green-100 text-green-800 border-green-300",
            Biology: "bg-emerald-100 text-emerald-800 border-emerald-300",
            English: "bg-red-100 text-red-800 border-red-300",
            Bangla: "bg-orange-100 text-orange-800 border-orange-300"
        }
        return colors[subject] || "bg-gray-100 text-gray-800 border-gray-300"
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-blue-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link href="/student" className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg font-bold text-xl">
                                🚀 EduRescue
                            </div>
                            <span className="text-gray-700 font-semibold">সেশন বুকিং</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4].map((step) => (
                                    <div
                                        key={step}
                                        className={`w-3 h-3 rounded-full ${step === currentStep
                                                ? "bg-blue-600"
                                                : step < currentStep
                                                    ? "bg-green-500"
                                                    : "bg-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="text-sm text-gray-500">
                                ধাপ {currentStep} / 4
                            </div>
                            <Link
                                href="/student"
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                            >
                                বাতিল করুন
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

                {/* Step 1: Subject & Expert Selection */}
                {currentStep === 1 && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Left Sidebar - Subject Selection */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 sticky top-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">বিষয় নির্বাচন</h3>
                                <div className="space-y-2">
                                    {subjects.map((subject) => (
                                        <button
                                            key={subject}
                                            onClick={() => setSelectedSubject(subject)}
                                            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${selectedSubject === subject
                                                    ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                                                    : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                                                }`}
                                        >
                                            {subject}
                                        </button>
                                    ))}
                                </div>

                                {/* Filters */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h4 className="font-semibold text-gray-900 mb-3">ফিল্টার</h4>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={filterOnline}
                                                    onChange={(e) => setFilterOnline(e.target.checked)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">শুধু অনলাইন এক্সপার্ট</span>
                                            </label>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                সর্বনিম্ন রেটিং
                                            </label>
                                            <select
                                                value={filterRating}
                                                onChange={(e) => setFilterRating(Number(e.target.value))}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value={0}>সব রেটিং</option>
                                                <option value={4.5}>৪.৫+</option>
                                                <option value={4.7}>৪.৭+</option>
                                                <option value={4.9}>৪.৯+</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content - Expert Selection */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 mb-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            {selectedSubject ? `${selectedSubject} এক্সপার্ট` : "এক্সপার্ট নির্বাচন"}
                                        </h2>
                                        <p className="text-gray-600">
                                            {selectedSubject
                                                ? `${selectedSubject} বিষয়ে বিশেষজ্ঞ এক্সপার্টদের তালিকা`
                                                : "প্রথমে একটি বিষয় সিলেক্ট করুন"
                                            }
                                        </p>
                                    </div>

                                    <div className="mt-4 md:mt-0">
                                        <input
                                            type="text"
                                            placeholder="এক্সপার্ট খুঁজুন..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                {!selectedSubject ? (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">🎯</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            প্রথমে একটি বিষয় সিলেক্ট করুন
                                        </h3>
                                        <p className="text-gray-600">
                                            বাম পাশ থেকে আপনার কাঙ্ক্ষিত বিষয় সিলেক্ট করুন
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {filteredExperts.map((expert) => (
                                            <div
                                                key={expert.id}
                                                className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition cursor-pointer"
                                                onClick={() => setShowExpertModal(true)}
                                            >
                                                <div className="flex items-start space-x-4">
                                                    <div className="relative">
                                                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                                            {expert.name.charAt(0)}
                                                        </div>
                                                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${expert.status === "online" ? "bg-green-500" : "bg-gray-400"
                                                            }`} />
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="font-semibold text-gray-900">{expert.name}</h4>
                                                            <div className="flex items-center space-x-1">
                                                                <span className="text-yellow-400">★</span>
                                                                <span className="text-sm font-medium text-gray-700">{expert.rating}</span>
                                                            </div>
                                                        </div>

                                                        <p className="text-sm text-gray-600 mb-2">{expert.bio}</p>

                                                        <div className="flex flex-wrap gap-1 mb-2">
                                                            {expert.tags.map((tag: string) => (
                                                                <span
                                                                    key={tag}
                                                                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                                            <span>অনুভূতি: {expert.experience}</span>
                                                            <span className="font-semibold text-green-600">৳{expert.fee}/ঘণ্টা</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleExpertSelect(expert)
                                                    }}
                                                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                                                >
                                                    সিলেক্ট করুন
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Recommended Section */}
                            {selectedSubject && (
                                <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-6 text-white">
                                    <h3 className="text-xl font-bold mb-4">💡 এক্সপার্ট সিলেকশন টিপস</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg">⭐</span>
                                            <span>উচ্চ রেটেড এক্সপার্ট বেছে নিন</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg">🕒</span>
                                            <span>অনলাইন এক্সপার্ট দ্রুত রেসপন্স দেন</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg">🎯</span>
                                            <span>আপনার লেভেলের জন্য ট্যাগযুক্ত এক্সপার্ট</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 2: Date, Time & Duration */}
                {currentStep === 2 && (
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 mb-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">সময় এবং তারিখ নির্বাচন</h2>
                                    <p className="text-gray-600">আপনার সুবিধামত সময় সিলেক্ট করুন</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">{selectedExpert?.name}</p>
                                    <p className="text-sm text-gray-600">{selectedSubject} এক্সপার্ট</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Date Selection */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">তারিখ</h3>
                                    <div className="space-y-2">
                                        {["আজ", "আগামীকাল", "পরশু"].map((day) => (
                                            <button
                                                key={day}
                                                onClick={() => setSelectedDate(day)}
                                                className={`w-full p-3 rounded-lg border-2 text-left ${selectedDate === day
                                                        ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                                                        : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                                                    }`}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time Selection */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">সময়</h3>
                                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                                        {timeSlots.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`p-2 rounded-lg border text-sm ${selectedTime === time
                                                        ? "border-green-500 bg-green-50 text-green-700 font-semibold"
                                                        : "border-gray-200 bg-white text-gray-700 hover:border-green-300"
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Duration Selection */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">সেশন দৈর্ঘ্য</h3>
                                    <div className="space-y-3">
                                        {durations.map((duration) => (
                                            <button
                                                key={duration.minutes}
                                                onClick={() => setSelectedDuration(duration.minutes)}
                                                className={`w-full p-4 rounded-lg border-2 text-left ${selectedDuration === duration.minutes
                                                        ? "border-purple-500 bg-purple-50 text-purple-700 font-semibold"
                                                        : "border-gray-200 bg-white text-gray-700 hover:border-purple-300"
                                                    } ${duration.recommended ? "ring-2 ring-purple-300" : ""}`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span>{duration.label}</span>
                                                    <span className="font-bold">৳{duration.price}</span>
                                                </div>
                                                {duration.recommended && (
                                                    <span className="text-xs text-purple-600">সবচেয়ে জনপ্রিয়</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
                                >
                                    ← এক্সপার্ট পরিবর্তন
                                </button>
                                <button
                                    onClick={handleBookingConfirm}
                                    disabled={!selectedDate || !selectedTime}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    পরবর্তী →
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Summary & Payment */}
                {currentStep === 3 && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">সেশন সামারি</h2>

                            {/* Booking Summary */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {selectedExpert?.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{selectedExpert?.name}</p>
                                            <p className="text-sm text-gray-600">{selectedSubject} এক্সপার্ট</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center space-x-1">
                                            <span className="text-yellow-400">★</span>
                                            <span className="font-medium">{selectedExpert?.rating}</span>
                                        </div>
                                        <p className="text-sm text-gray-600">{selectedExpert?.sessions} সেশন</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600">তারিখ</p>
                                        <p className="font-semibold text-gray-900">{selectedDate}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600">সময়</p>
                                        <p className="font-semibold text-gray-900">{selectedTime}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600">দৈর্ঘ্য</p>
                                        <p className="font-semibold text-gray-900">
                                            {durations.find(d => d.minutes === selectedDuration)?.label}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600">বিষয়</p>
                                        <p className="font-semibold text-gray-900">{selectedSubject}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3">কস্ট ব্রেকডাউন</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">সেশন ফি</span>
                                        <span className="font-semibold">৳{basePrice}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">সার্ভিস চার্জ</span>
                                        <span className="font-semibold">৳{serviceFee}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300">
                                        <span>মোট</span>
                                        <span className="text-blue-600">৳{totalPrice}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3">পেমেন্ট মেথড</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {["bKash", "Nagad", "Rocket"].map((method) => (
                                        <button
                                            key={method}
                                            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition text-center"
                                        >
                                            <div className="text-2xl mb-2">
                                                {method === "bKash" ? "📱" : method === "Nagad" ? "💳" : "🚀"}
                                            </div>
                                            <span className="font-medium text-gray-700">{method}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setCurrentStep(2)}
                                    className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
                                >
                                    ← সময় পরিবর্তন
                                </button>
                                <button
                                    onClick={handlePayment}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                                >
                                    💳 পেমেন্ট করুন
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
                                ✅
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">সেশন বুকিং সফল!</h2>
                            <p className="text-gray-600 mb-6">
                                আপনার সেশন সফলভাবে বুক হয়েছে। সেশন ডিটেইলস নিচে দেওয়া হলো।
                            </p>

                            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                                <div className="text-center mb-4">
                                    <div className="text-2xl font-bold text-green-600 mb-2">ERS-{Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
                                    <p className="text-green-700">সেশন আইডি</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="text-left">
                                        <p className="text-gray-600">এক্সপার্ট</p>
                                        <p className="font-semibold">{selectedExpert?.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-600">তারিখ & সময়</p>
                                        <p className="font-semibold">{selectedDate}, {selectedTime}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => router.push("/student")}
                                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                                >
                                    🎯 সেশনে জয়েন করুন
                                </button>
                                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                                    📅 ক্যালেন্ডারে যোগ করুন
                                </button>
                                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                                    🔔 রিমাইন্ডার সেট করুন
                                </button>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    কোনো সমস্যা হলে আমাদের সাপোর্ট টিম কে কন্টাক্ট করুন:
                                    <span className="text-blue-600"> support@edurescue.com</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Expert Detail Modal */}
            {showExpertModal && selectedExpert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                                        {selectedExpert.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{selectedExpert.name}</h3>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center space-x-1">
                                                <span className="text-yellow-400">★</span>
                                                <span className="font-medium">{selectedExpert.rating}</span>
                                            </div>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-gray-600">{selectedExpert.experience} অভিজ্ঞতা</span>
                                            <span className="text-gray-400">•</span>
                                            <span className={`px-2 py-1 rounded-full text-xs ${selectedExpert.status === "online"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}>
                                                {selectedExpert.status === "online" ? "অনলাইন" : "অফলাইন"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowExpertModal(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">শিক্ষাগত যোগ্যতা</h4>
                                    <p className="text-gray-600 mb-4">{selectedExpert.education}</p>

                                    <h4 className="font-semibold text-gray-900 mb-3">বিশেষজ্ঞতা</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedExpert.expertise.map((skill: string) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">স্টুডেন্ট ফিডব্যাক</h4>
                                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                        <p className="text-gray-600 italic">"{selectedExpert.feedback}"</p>
                                    </div>

                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-gray-900">সেশন কমপ্লিটেড</span>
                                            <span className="text-blue-600 font-bold">{selectedExpert.sessions}+</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-gray-900">ঘণ্টাপ্রতি ফি</span>
                                            <span className="text-green-600 font-bold">৳{selectedExpert.fee}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => setShowExpertModal(false)}
                                    className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
                                >
                                    বন্ধ করুন
                                </button>
                                <button
                                    onClick={() => {
                                        setShowExpertModal(false)
                                        handleExpertSelect(selectedExpert)
                                    }}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                                >
                                    সিলেক্ট করুন
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}