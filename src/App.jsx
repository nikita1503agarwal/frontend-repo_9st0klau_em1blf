import LoginForm from './components/LoginForm'

function App() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.2),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(147,51,234,0.2),transparent_35%)]"></div>

      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        <div className="text-white">
          <div className="flex items-center gap-3 mb-6">
            <img src="/flame-icon.svg" alt="Flames" className="w-10 h-10" />
            <span className="text-xl font-semibold tracking-tight">Flames B2B</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Secure access to your business portal
          </h1>
          <p className="text-blue-100/90 text-lg max-w-lg">
            Sign in with your company code and work email to manage orders, invoices, and team permissions.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}

export default App
