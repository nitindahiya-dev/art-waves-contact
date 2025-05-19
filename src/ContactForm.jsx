import { useState } from 'react'
import { FaCheckCircle, FaPaperPlane } from 'react-icons/fa'
import { FloatingShapes } from './components/FloatingShapes'
import { toast } from 'react-toastify'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const validateForm = () => {
    const { name, email, message } = formData
    const newErrors = {}

    if (!name.trim()) newErrors.name = 'Name is required.'
    if (!email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Invalid email address.'
    }
    if (!message.trim()) newErrors.message = 'Message is required.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSending(true)
      toast.info('Sending your message...', { autoClose: 2000 })
      setTimeout(() => {
        setIsSubmitted(true)
        setIsSending(false)
        toast.success('Message delivered!', { autoClose: 3000 })
        setFormData({ name: '', email: '', message: '' })
      }, 2000)
    } else {
      toast.error('Please fix the errors in the form.', { autoClose: 3000 })
    }
  }

  if (isSubmitted) {
    return (
      <div className="relative text-center p-12 bg-glass backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full \
        border border-white/20 transform transition-all duration-500 hover:scale-[1.02]">
        <FloatingShapes />
        <FaCheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6 animate-pop-in" />
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-art-primary to-art-secondary mb-4">
          Message Delivered!
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          We've received your message. Our team will orbit back to you soon.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="relative overflow-hidden bg-art-primary/20 hover:bg-art-primary/30 border border-art-primary/30 \
          text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 group"
        >
          <span className="relative z-10">New Message</span>
          <div className="absolute inset-0 bg-gradient-to-r from-art-primary/40 to-transparent opacity-0 \
            group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-8 bg-glass backdrop-blur-xl p-12 rounded-2xl \
      shadow-2xl max-w-md w-full border border-white/20 transform transition-all duration-500 hover:scale-[1.02]">
      <FloatingShapes />
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-art-primary to-art-secondary \
        text-center mb-10 animate-gradient bg-300%">
        Contact Art Waves
      </h2>

      <div className="relative">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl  placeholder-gray-400 \
            focus:outline-none border-art-primary ring-2 ring-art-primary/30 transition-all"
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-2 animate-shake">{errors.name}</p>
        )}
      </div>

      <div className="relative">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl  placeholder-gray-400 \
            focus:outline-none border-art-primary ring-2 ring-art-primary/30 transition-all"
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-2 animate-shake">{errors.email}</p>
        )}
      </div>

      <div className="relative">
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl  placeholder-gray-400 \
            focus:outline-none border-art-primary ring-2 ring-art-primary/30 transition-all"
          placeholder="Your creative message..."
        ></textarea>
        {errors.message && (
          <p className="text-red-400 text-sm mt-2 animate-shake">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="w-full py-5 bg-art-primary/20 hover:bg-art-primary/30 border border-art-primary/30 text-white \
          font-bold rounded-xl flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden"
      >
        {isSending ? (
          <>
            <div className="w-6 h-6 border-4 border-white/30 border-t-art-primary rounded-full animate-spin"></div>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <FaPaperPlane className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            <span>Launch Message</span>
            <div className="absolute inset-0 bg-gradient-to-r from-art-primary/40 to-transparent opacity-0 \
              hover:opacity-100 transition-opacity duration-300"></div>
          </>
        )}
      </button>
    </form>
  )
}
