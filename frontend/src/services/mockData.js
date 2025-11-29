// Mock Data Service for Frontend Development
// This provides sample data when the backend is not available

export const mockUsers = [
  {
    _id: "1",
    firstName: "Galal",
    lastName: "Al-Muslimani",
    email: "admin@autologic.com",
    phone: "1234567890",
    password: "admin123456",
    role: "admin",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: "2",
    firstName: "John",
    lastName: "Technician",
    email: "tech@autologic.com",
    phone: "0987654321",
    password: "user123456",
    role: "technician",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: "3",
    firstName: "Sarah",
    lastName: "Customer",
    email: "sarah@example.com",
    phone: "1122334455",
    password: "user123456",
    role: "user",
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: "4",
    firstName: "Mike",
    lastName: "Driver",
    email: "mike@example.com",
    phone: "5544332211",
    password: "user123456",
    role: "user",
    isActive: true,
    createdAt: new Date(),
  },
];

export const mockServices = [
  {
    _id: "1",
    name: "Full Engine Diagnostics",
    description:
      "Complete computer diagnostics check to identify engine issues, sensor failures, and performance problems.",
    category: "Diagnostic",
    price: 80,
    duration: 60,
    isActive: true,
    images: [
      {
        url: "https://res.cloudinary.com/dp0yyiuj0/image/upload/v1763805884/autologic/services/vzai3ijdtrjyo8twjscs.jpg",
        publicId: "seed-1",
        alt: "Diagnostics",
      },
    ],
  },
  {
    _id: "2",
    name: "Synthetic Oil Change",
    description:
      "Premium synthetic oil change including oil filter replacement and fluid top-up.",
    category: "Oil",
    price: 60,
    duration: 45,
    isActive: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800",
        publicId: "seed-2",
        alt: "Oil Change",
      },
    ],
  },
  {
    _id: "3",
    name: "Brake Pad Replacement",
    description:
      "Front or rear brake pad replacement with ceramic pads. Includes rotor inspection.",
    category: "Brakes",
    price: 150,
    duration: 90,
    isActive: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800",
        publicId: "seed-3",
        alt: "Brakes",
      },
    ],
  },
  {
    _id: "4",
    name: "Tire Rotation & Balance",
    description:
      "Extend your tire life with professional rotation and computer balancing.",
    category: "Tires",
    price: 40,
    duration: 45,
    isActive: true,
    images: [
      {
        url: "https://res.cloudinary.com/dp0yyiuj0/image/upload/v1763805828/autologic/services/fhvpsunkxfylqiivri7s.jpg",
        publicId: "seed-4",
        alt: "Tires",
      },
    ],
  },
  {
    _id: "5",
    name: "Battery Replacement",
    description:
      "Installation of a new premium battery with a 3-year warranty. Includes charging system check.",
    category: "Electrical",
    price: 120,
    duration: 30,
    isActive: true,
    images: [
      {
        url: "https://res.cloudinary.com/dp0yyiuj0/image/upload/v1763805558/autologic/services/y6vpbedjpszdixovrmyc.jpg",
        publicId: "seed-5",
        alt: "Battery",
      },
    ],
  },
  {
    _id: "6",
    name: "AC Recharge Service",
    description:
      "Refrigerant evacuation and recharge to keep your air conditioning ice cold.",
    category: "AC",
    price: 100,
    duration: 60,
    isActive: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=800",
        publicId: "seed-6",
        alt: "AC",
      },
    ],
  },
];

export const mockBookings = [
  {
    _id: "1",
    customer: {
      _id: mockUsers[2]._id,
      firstName: mockUsers[2].firstName,
      lastName: mockUsers[2].lastName,
      email: mockUsers[2].email,
    },
    service: {
      _id: mockServices[0]._id,
      name: mockServices[0].name,
      price: mockServices[0].price,
    },
    appointmentDate: new Date(Date.now() + 86400000), // Tomorrow
    appointmentTime: "10:00",
    status: "pending",
    estimatedCost: mockServices[0].price,
    car: { make: "Toyota", model: "Camry", year: 2019 },
    issue: { description: "Check engine light is on" },
  },
  {
    _id: "2",
    customer: {
      _id: mockUsers[2]._id,
      firstName: mockUsers[2].firstName,
      lastName: mockUsers[2].lastName,
      email: mockUsers[2].email,
    },
    service: {
      _id: mockServices[1]._id,
      name: mockServices[1].name,
      price: mockServices[1].price,
    },
    appointmentDate: new Date(Date.now() + 172800000), // Day after tomorrow
    appointmentTime: "14:00",
    status: "confirmed",
    technician: {
      _id: mockUsers[1]._id,
      firstName: mockUsers[1].firstName,
      lastName: mockUsers[1].lastName,
      email: mockUsers[1].email,
    },
    estimatedCost: mockServices[1].price,
    car: { make: "Honda", model: "Civic", year: 2021 },
    issue: { description: "Regular maintenance" },
  },
];

export const mockBlogs = [
  {
    _id: "1",
    title: "5 Signs Your Brakes Need Replacing",
    slug: "5-signs-brakes-need-replacing",
    excerpt:
      "Squeaking noises? Soft pedal? Learn the warning signs of worn brake pads.",
    content:
      "Brakes are the most critical safety feature of your car. Here are the top 5 signs they need attention: 1. Squealing or grinding noises. 2. Vibration when braking. 3. Taking longer to stop. 4. The brake light is on. 5. The car pulls to one side.",
    category: "Maintenance",
    tags: ["brakes", "safety", "maintenance"],
    status: "published",
    author: {
      firstName: "Galal",
      lastName: "Al-Muslimani",
    },
    isPublic: true,
    isFeatured: true,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800",
      publicId: "seed-blog-1",
      alt: "Brakes",
    },
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    _id: "2",
    title: "How Often Should You Change Your Oil?",
    slug: "how-often-oil-change",
    excerpt:
      "Is the 3,000-mile rule still valid? We bust common oil change myths.",
    content:
      "Modern engines and synthetic oils have changed the rules. While the old rule was every 3,000 miles, most modern cars can go 5,000 to 7,500 miles between changes. Always check your owner's manual for the definitive answer.",
    category: "Tips",
    tags: ["oil", "engine", "tips"],
    status: "published",
    isPublic: true,
    author: {
      firstName: "Galal",
      lastName: "Al-Muslimani",
    },
    isFeatured: true,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800",
      publicId: "seed-blog-2",
      alt: "Oil",
    },
    createdAt: "2024-01-10T14:30:00Z",
  },
  {
    _id: "3",
    title: "Winter Car Care Guide",
    slug: "winter-car-care-guide",
    excerpt:
      "Prepare your vehicle for the cold months with this essential checklist.",
    content:
      "Winter can be tough on cars. Make sure to: 1. Check your battery. 2. Inspect tires (consider winter tires). 3. Check antifreeze levels. 4. Replace wiper blades. 5. Keep your gas tank at least half full.",
    category: "Guides",
    tags: ["winter", "safety", "guide"],
    status: "published",
    isPublic: true,
    author: {
      firstName: "Galal",
      lastName: "Al-Muslimani",
    },
    isFeatured: false,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800",
      publicId: "seed-blog-3",
      alt: "Winter",
    },
    createdAt: "2024-01-18T14:30:00Z",
  },
];

export const mockContacts = [
  {
    _id: "1",
    name: "John Doe",
    email: "johndoe@test.com",
    phone: "1234567890",
    message: "Hi, do you have Michelin tires for a 2020 Honda Civic?",
    type: "general",
    status: "new",
    priority: "medium",
    createdAt: new Date(),
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@test.com",
    phone: "0987654321",
    message: "I need to cancel my appointment for tomorrow please.",
    type: "support",
    status: "resolved",
    priority: "high",
    createdAt: new Date(),
  },
];

// Mock API functions that return promises
export const mockAPI = {
  admin: {
    getDashboardStats: () =>
      Promise.resolve({
        data: {
          data: {
            overview: {
              totalUsers: mockUsers.length,
              totalServices: mockServices.length,
              totalBookings: mockBookings.length,
              totalContacts: mockContacts.length,
            },
          },
        },
      }),
  },
  auth: {
    login: (email, password) => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        return Promise.resolve({
          data: {
            token: "mock-jwt-token",
            data: { user },
          },
        });
      } else {
        return Promise.reject({
          response: {
            data: { message: "Invalid email or password" },
          },
        });
      }
    },
    register: (userData) => {
      const existingUser = mockUsers.find((u) => u.email === userData.email);
      if (existingUser) {
        return Promise.reject({
          response: {
            data: { message: "Email already in use" },
          },
        });
      }
      const newUser = {
        _id: (mockUsers.length + 1).toString(),
        ...userData,
        role: "user",
        isActive: true,
      };
      mockUsers.push(newUser);
      return Promise.resolve({
        data: {
          token: "mock-jwt-token",
          data: { user: newUser },
        },
      });
    },
  },
  users: {
    getAll: () =>
      Promise.resolve({
        data: {
          data: {
            users: mockUsers,
          },
        },
      }),
    getById: (id) =>
      Promise.resolve({
        data: {
          data: {
            user: mockUsers.find((u) => u._id === id),
          },
        },
      }),
    getTechnicians: () =>
      Promise.resolve({
        data: {
          data: {
            technicians: mockUsers.filter((u) => u.role === "technician"),
          },
        },
      }),
  },
  services: {
    getAll: () =>
      Promise.resolve({
        data: {
          data: {
            services: mockServices,
          },
        },
      }),
    getById: (id) =>
      Promise.resolve({
        data: {
          data: {
            service: mockServices.find((s) => s._id === id),
          },
        },
      }),
  },
  bookings: {
    getAll: () =>
      Promise.resolve({
        data: {
          data: {
            bookings: mockBookings,
          },
        },
      }),
    getById: (id) =>
      Promise.resolve({
        data: {
          data: {
            booking: mockBookings.find((s) => s._id === id),
          },
        },
      }),
    getByUserId: (userId) =>
      Promise.resolve({
        data: {
          data: {
            bookings: mockBookings.filter((b) => b.customer._id === userId),
          },
        },
      }),
    cancel: (id) => {
      const bookingIndex = mockBookings.findIndex((b) => b._id === id);
      if (bookingIndex !== -1) {
        mockBookings[bookingIndex].status = "cancelled";
        return Promise.resolve({
          data: {
            message: "Booking cancelled successfully",
          },
        });
      } else {
        return Promise.reject({
          response: {
            data: { message: "Booking not found" },
          },
        });
      }
    },
    getAvailableSlots: () => {
      // Return mock time slots for the given date
      const slots = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
      ];
      return Promise.resolve({
        data: {
          data: {
            slots,
          },
        },
      });
    },
  },
  blogs: {
    getAll: () =>
      Promise.resolve({
        data: {
          data: {
            blogs: mockBlogs,
          },
        },
      }),
    getById: (id) =>
      Promise.resolve({
        data: {
          data: {
            blog: mockBlogs.find((b) => b._id === id),
          },
        },
      }),
    getByCategory: (category) =>
      Promise.resolve({
        data: {
          data: {
            blogs: mockBlogs.filter((b) => b.category === category),
          },
        },
      }),
  },
  contacts: {
    getAll: () =>
      Promise.resolve({
        data: {
          data: {
            contacts: mockContacts,
          },
        },
      }),
    getById: (id) =>
      Promise.resolve({
        data: {
          data: {
            contact: mockContacts.find((b) => b._id === id),
          },
        },
      }),
  },
};
