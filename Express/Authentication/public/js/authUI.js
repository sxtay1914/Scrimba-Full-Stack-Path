// ===== Check if user is signed in =====
export async function checkAuth() {
  try {
    const res = await fetch('/api/auth/me')

    if (!res.ok) {
      console.warn('Unexpected response:', res.status)
      return false
    } 
  
    const user = await res.json()
    if (!user.isLoggedIn) {
      return false
    }
    return user.name

  } catch (err) {
    console.log(err, 'Auth check failed')
    return false 
  }
}

// ===== Greet user or guest =====

export function renderGreeting(name) {
  const user = name ? name : 'Guest'
  document.getElementById('greeting').textContent = `Welcome, ${user}!`
}

// ===== Only display logout button if logged in, else display log in/sign in options =====

export function showHideMenuItems(name) {
  const isLoggedIn = name
  document.getElementById('login').style.display = isLoggedIn ? 'none' : 'inline'
  document.getElementById('signup').style.display = isLoggedIn ? 'none' : 'inline'
  document.getElementById('logout-btn').style.display = isLoggedIn ? 'inline' : 'none'
}
