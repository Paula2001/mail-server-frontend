<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="p-2">
          <v-card-title class="d-flex justify-space-between align-center">
            <div>
              <div class="text-h5">{{ domain.name }}</div>
              <div class="text-subtitle-2 text-medium-emphasis">
                Mail server domain details
              </div>
            </div>

            <v-chip :color="domain.active ? 'green' : 'red'">
              {{ domain.active ? 'Active' : 'Disabled' }}
            </v-chip>
          </v-card-title>

          <v-divider />

          <v-card-text class="p-5">
            <v-row>
              <v-col cols="12" md="6">
                <v-list density="compact">
                  <v-list-subheader>Domain Info</v-list-subheader>

                  <v-list-item>
                    <v-list-item-title>Domain</v-list-item-title>
                    <v-list-item-subtitle>{{ domain.name }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Created</v-list-item-title>
                    <v-list-item-subtitle>{{ domain.createdAt }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Mailboxes</v-list-item-title>
                    <v-list-item-subtitle>{{ domain.mailboxes }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" md="6">
                <v-list density="compact">
                  <v-list-subheader>DNS Records</v-list-subheader>

                  <v-list-item
                    v-for="record in dnsRecords"
                    :key="record.type"
                  >
                    <v-list-item-title class="font-weight-medium">
                      {{ record.type }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="monospace">
                      {{ record.value }}
                    </v-list-item-subtitle>

                    <template #append>
                      <v-chip
                        size="small"
                        :color="record.valid ? 'green' : 'orange'"
                      >
                        {{ record.valid ? 'Valid' : 'Missing' }}
                      </v-chip>
                    </template>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-btn color="primary" @click="editDomain">
              Edit
            </v-btn>

            <v-btn variant="text" @click="refreshDns">
              Check DNS
            </v-btn>

            <v-spacer />

            <v-btn color="red" variant="text" @click="disableDomain">
              Disable Domain
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title>Mailboxes</v-card-title>

          <v-data-table
            :headers="mailboxHeaders"
            :items="mailboxes"
            item-value="email"
          >
            <template #item.active="{ item }">
              <v-chip size="small" :color="item.active ? 'green' : 'red'">
                {{ item.active ? 'Active' : 'Disabled' }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const domain = {
  name: 'example.com',
  active: true,
  createdAt: '2026-06-04',
  mailboxes: 3,
}

const dnsRecords = [
  { type: 'MX',    value: '10 mail.example.com',           valid: true  },
  { type: 'SPF',   value: 'v=spf1 mx -all',                valid: true  },
  { type: 'DKIM',  value: 'default._domainkey.example.com', valid: false },
  { type: 'DMARC', value: 'v=DMARC1; p=quarantine',        valid: true  },
]

const mailboxHeaders = [
  { title: 'Email',        key: 'email'   },
  { title: 'Storage Used', key: 'storage' },
  { title: 'Status',       key: 'active'  },
]

const mailboxes = [
  { email: 'admin@example.com',   storage: '1.2 GB', active: true  },
  { email: 'support@example.com', storage: '830 MB', active: true  },
  { email: 'billing@example.com', storage: '250 MB', active: false },
]

function editDomain() {
  router.push(`/mail/domains/${domain.name}/edit`)
}

function refreshDns() {
  console.log('Check DNS records')
}

function disableDomain() {
  console.log('Disable domain')
}
</script>

<style scoped>
.monospace {
  font-family: monospace;
}
</style>