const signupForm = document.getElementById('signup-form')
const errorMessage = document.getElementById('error-message') 

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault() // Prevent form from reloading

  const name = document.getElementById('signup-name').value.trim()
  const email = document.getElementById('signup-email').value.trim()
  const username = document.getElementById('signup-username').value.trim()
  const password = document.getElementById('signup-password').value.trim()
  const submitBtn = signupForm.querySelector('button')

  errorMessage.textContent = '' // Clear old errors
  submitBtn.disabled = true

  try {
    const res = await fetch('api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, username, password })
    })

    const data = await res.json()

    if (res.ok) {
      window.location.href = '/'
    } else {
      errorMessage.textContent = data.error || 'Registration failed. Please try again.'
    }
  } catch (err) {
    console.error('Network error:', err)
    errorMessage.textContent = 'Unable to connect. Please try again.'
  } finally {
    submitBtn.disabled = false
  }
})
