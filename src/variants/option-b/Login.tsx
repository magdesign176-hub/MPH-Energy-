import { useState, type FormEvent } from 'react'
import { Icon } from '../../components/Icon'
import { contact, login } from '../../shared/content'
import { Logo, ModeToggle, href } from './ui'

export default function Login() {
  const [mode, setMode] = useState<'signin' | 'reset'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState<string | null>(null)

  // No authentication backend: simulate the request so the flow can be reviewed.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim()
    setPending(true)
    window.setTimeout(() => {
      setPending(false)
      setDone(email)
    }, 1000)
  }

  const switchMode = (next: 'signin' | 'reset') => {
    setMode(next)
    setDone(null)
    setShowPassword(false)
  }

  return (
    <section className="b-auth">
      <div className="b-auth-top">
        <a className="b-textlink" href={href('home')}>
          <Icon name="arrowLeft" size={16} /> Back to website
        </a>
        <ModeToggle />
      </div>

      <div className="b-auth-card" aria-live="polite">
        <div className="b-auth-head">
          <Logo />
          <span className="b-mono">
            <Icon name="lock" size={14} /> {login.eyebrow}
          </span>
        </div>

        {done ? (
          <div className="b-success">
            <span className="b-success-mark">
              <Icon name="check" size={24} />
            </span>
            {mode === 'signin' ? (
              <>
                <h1 className="b-display b-h3">Welcome back.</h1>
                <p>
                  You are signed in as <b>{done}</b>.
                </p>
              </>
            ) : (
              <>
                <h1 className="b-display b-h3">Check your inbox.</h1>
                <p>
                  If an account exists for <b>{done}</b>, we have sent a link to reset your password.
                </p>
              </>
            )}
            <button type="button" className="b-btn b-btn-outline" onClick={() => switchMode('signin')}>
              <span>{mode === 'signin' ? 'Sign out' : 'Back to sign in'}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} key={mode} className="b-auth-form">
            <h1 className="b-display b-h3">{mode === 'signin' ? 'Sign in' : 'Reset password'}</h1>
            <p className="b-muted">
              {mode === 'signin'
                ? login.title
                : 'Enter the email linked to your account and we will send you a reset link.'}
            </p>
            <label className="b-field">
              <span>Email address</span>
              <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
            </label>
            {mode === 'signin' && (
              <label className="b-field">
                <span>Password</span>
                <span className="b-password">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    autoComplete="current-password"
                    placeholder="Minimum 8 characters"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword(v => !v)}
                  >
                    <Icon name={showPassword ? 'eyeOff' : 'eye'} size={18} />
                  </button>
                </span>
              </label>
            )}
            {mode === 'signin' && (
              <div className="b-auth-row">
                <label className="b-check">
                  <input type="checkbox" name="remember" />
                  <span aria-hidden="true" />
                  Keep me signed in
                </label>
                <button type="button" className="b-linkbtn" onClick={() => switchMode('reset')}>
                  Forgot password?
                </button>
              </div>
            )}
            <button className="b-btn b-btn-solid b-btn-block" type="submit" disabled={pending}>
              <span>{pending ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Send reset link'}</span>
              <Icon name="arrowRight" size={16} />
            </button>
            {pending && <span className="b-progress" aria-hidden="true" />}
            <p className="b-auth-foot">
              {mode === 'signin' ? (
                <>
                  Not a client yet? <a href={href('contact')}>Request access</a>
                </>
              ) : (
                <button type="button" className="b-linkbtn" onClick={() => switchMode('signin')}>
                  <Icon name="arrowLeft" size={14} /> Back to sign in
                </button>
              )}
            </p>
          </form>
        )}
      </div>

      <p className="b-auth-help b-mono">
        Need help? <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
    </section>
  )
}
