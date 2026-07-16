const signinForm = document.getElementById('signin-form')
const errorMessage = document.getElementById('error-message')

signinForm.addEventListener('submit', async (e) => {
  e.preventDefault() // Prevent form from reloading the page

  const username = document.getElementById('signin-username').value.trim()
  const password = document.getElementById('signin-password').value.trim()
  const submitBtn = signinForm.querySelector('button')

  errorMessage.textContent = '' // Clear old error messages
  submitBtn.disabled = true

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', 
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    if (res.ok) { 
      window.location.href = '/'
    } else {
      errorMessage.textContent = data.error || 'Login failed. Please try again.'
    }
  } catch (err) {
    console.error('Network error:', err)
    errorMessage.textContent = 'Unable to connect. Please try again.'
  } finally {
    submitBtn.disabled = false
  }
})
