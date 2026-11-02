import { useState, type FormEvent } from 'react'
import { Icon } from '../../components/Icon'
import { contact, login } from '../../shared/content'
import { href } from './routes'
import { HorizonArt, Logo, ModeToggle, Spinner } from './ui'

type Mode = 'signin' | 'reset'

export function Login() {
  const [mode, setMode] = useState<Mode>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState<string | null>(null)

  // No authentication backend: this simulates the request so the flow can be reviewed.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim()
    setPending(true)
    window.setTimeout(() => {
      setPending(false)
      setDone(email)
    }, 1100)
  }

  const switchMode = (next: Mode) => {
    setMode(next)
    setDone(null)
    setShowPassword(false)
  }

  return (
    <section className="login">
      <HorizonArt className="horizon-login" />

      <div className="login-top">
        <a className="login-back glass" href={href('home')}>
          <Icon name="arrowLeft" size={16} /> Back to website
        </a>
        <ModeToggle />
      </div>

      <div className="login-card glass" aria-live="polite">
        <Logo className="login-logo" />
        {done ? (
          <div className="success">
            <span className="success-ico">
              <Icon name="check" size={30} />
            </span>
            {mode === 'signin' ? (
              <>
                <h1>Welcome back.</h1>
                <p>
                  You are signed in as <b>{done}</b>.
                </p>
              </>
            ) : (
              <>
                <h1>Check your inbox.</h1>
                <p>
                  If an account exists for <b>{done}</b>, we have sent a link to reset your password.
                </p>
              </>
            )}
            <button type="button" className="c-btn c-btn-glass c-btn-block" onClick={() => switchMode('signin')}>
              <span>{mode === 'signin' ? 'Sign out' : 'Back to sign in'}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} key={mode}>
            <div className="login-head">
              <p className="login-kicker">
                <Icon name="lock" size={14} /> {login.eyebrow}
              </p>
              <h1>{mode === 'signin' ? login.title : 'Reset your password'}</h1>
              {mode === 'reset' && <p>Enter the email linked to your account and we will send you a reset link.</p>}
            </div>
            <fieldset className="login-fields" disabled={pending}>
              <label className="field">
                <span>Email address</span>
                <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
              </label>
              {mode === 'signin' && (
                <label className="field">
                  <span>Password</span>
                  <span className="password">
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
            </fieldset>
            {mode === 'signin' && (
              <div className="login-row">
                <label className="checkbox">
                  <input type="checkbox" name="remember" />
                  <span className="checkbox-box" aria-hidden="true">
                    <Icon name="check" size={12} />
                  </span>
                  Keep me signed in
                </label>
                <button type="button" className="link-btn" onClick={() => switchMode('reset')}>
                  Forgot password?
                </button>
              </div>
            )}
            <button className="c-btn c-btn-primary c-btn-block" type="submit" disabled={pending}>
              {pending ? (
                <>
                  <Spinner />
                  <span>{mode === 'signin' ? 'Signing in…' : 'Sending…'}</span>
                </>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign in' : 'Send reset link'}</span>
                  <Icon name="arrowRight" size={18} />
                </>
              )}
            </button>
            <p className="login-foot">
              {mode === 'signin' ? (
                <>
                  Not a client yet? <a href={href('contact')}>Request access</a>
                </>
              ) : (
                <button type="button" className="link-btn" onClick={() => switchMode('signin')}>
                  <Icon name="arrowLeft" size={16} /> Back to sign in
                </button>
              )}
            </p>
          </form>
        )}
      </div>

      <p className="login-help">
        Need help? <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
    </section>
  )
}
