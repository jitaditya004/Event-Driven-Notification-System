import "dotenv/config"
import { createUser } from "@/modules/user/user.service"

async function test() {
  const user = await createUser({
    email: `test-${Date.now()}@test.com`
  })

  console.log("User created:", user.id)

  process.exit(0)
}

test()