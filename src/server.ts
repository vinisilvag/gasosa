import { app } from './app'

import { PORT } from '@/config/env/app'

app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`)
})
