db = db.getSiblingDB('registrations');

// Create collections with validation
db.createCollection('registrations', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'phone', 'event', 'registrationId', 'registeredAt'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          description: 'must be a valid email address and is required'
        },
        phone: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        event: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        registrationId: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        registeredAt: {
          bsonType: 'date',
          description: 'must be a date and is required'
        }
      }
    }
  }
});

// Create indexes
db.registrations.createIndex({ email: 1 }, { unique: true });
db.registrations.createIndex({ registrationId: 1 }, { unique: true });
db.registrations.createIndex({ registeredAt: 1 });

print('Database and collections initialized successfully'); 