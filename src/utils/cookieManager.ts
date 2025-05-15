import Cookies from 'js-cookie';

// Cookie configuration
const COOKIE_OPTIONS = {
  path: '/',             // Make cookie available for all paths
  sameSite: 'lax' as const,  // Less restrictive setting allows cookies in same-site navigation
  secure: process.env.NODE_ENV === 'production', // Only use secure in production 
  expires: 7              // 7 days expiry
};

const cookieManager = {
  /**
   * Set a cookie with consistent options
   */
  set: (name: string, value: string) => {
    try {
      console.log(`Setting cookie: ${name}`);
      // First attempt - with domain option
      Cookies.set(name, value, {
        ...COOKIE_OPTIONS,
        domain: window.location.hostname === 'localhost' ? 'localhost' : undefined
      });
      
      // Verify cookie was set
      const check = Cookies.get(name);
      if (!check) {
        console.log(`Cookie ${name} not set on first attempt, trying alternate options`);
        // Second attempt - try without domain
        Cookies.set(name, value, COOKIE_OPTIONS);
        
        // Verify again
        const secondCheck = Cookies.get(name);
        if (!secondCheck) {
          console.error(`Failed to set cookie: ${name}`);
          // Store in localStorage as backup
          localStorage.setItem(name, value);
          console.log(`Stored ${name} in localStorage as fallback`);
        }
      }
    } catch (error) {
      console.error('Error setting cookie:', error);
      // Store in localStorage as backup
      localStorage.setItem(name, value);
    }
  },

  /**
   * Get a cookie value, falling back to localStorage if needed
   */
  get: (name: string): string | null => {
    try {
      // Try cookie first
      const value = Cookies.get(name);
      if (value) return value;
      
      // Try localStorage fallback
      const localValue = localStorage.getItem(name);
      if (localValue) {
        console.log(`Using localStorage fallback for ${name}`);
        return localValue;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting cookie:', error);
      return null;
    }
  },

  /**
   * Remove a cookie and its localStorage backup
   */
  remove: (name: string) => {
    try {
      Cookies.remove(name, { path: '/' });
      localStorage.removeItem(name);
    } catch (error) {
      console.error('Error removing cookie:', error);
    }
  }
};

export default cookieManager;
