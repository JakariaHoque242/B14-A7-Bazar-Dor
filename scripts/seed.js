const { auth } = require("../src/lib/auth");

async function seed() {
  try {
    console.log("Seeding demo user...");
    await auth.api.signUpEmail({
      body: {
        name: "Rezwan Ahmed",
        email: "rezwanahmed@gmail.com",
        password: "password123",
      },
    });
    console.log("Demo user seeded successfully: rezwanahmed@gmail.com / password123");
  } catch (err) {
    console.log("User may already exist or seeded:", err.message || err);
  }
}

seed();
