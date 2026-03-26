import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const UserCenterPage = () => (
  <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
    <View style={styles.hero}>
      <View>
        <Text style={styles.heroSubText}>Lv.3 Member</Text>
        <Text style={styles.heroTitle}>Alex Li</Text>
      </View>
      <Pressable style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </Pressable>
    </View>

    <View style={styles.card}>
      <Text style={styles.cardTitle}>Assets</Text>
      <View style={styles.assetGrid}>
        {[
          { value: '1280', label: 'Points' },
          { value: '6', label: 'Coupons' },
          { value: '¥230', label: 'Balance' },
        ].map((item) => (
          <View key={item.label} style={styles.assetItem}>
            <Text style={styles.assetValue}>{item.value}</Text>
            <Text style={styles.assetLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>

    <View style={styles.card}>
      <Text style={styles.cardTitle}>Orders</Text>
      <View style={styles.orderGrid}>
        {['To Pay', 'To Ship', 'To Receive', 'After Sale'].map((item) => (
          <Pressable key={item} style={styles.orderItem}>
            <Text style={styles.orderText}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </View>

    <View style={styles.card}>
      <Text style={styles.cardTitle}>Common Tools</Text>
      {['Address', 'Invoice', 'Support', 'Settings'].map((item, index) => (
        <View key={item} style={[styles.toolRow, index > 0 && styles.toolRowWithBorder]}>
          <Text style={styles.toolText}>{item}</Text>
        </View>
      ))}
    </View>
  </ScrollView>
)

const styles = StyleSheet.create({
  assetGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  assetItem: {
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    flex: 1,
    paddingVertical: 12,
  },
  assetLabel: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 2,
  },
  assetValue: {
    color: '#14532d',
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
  },
  cardTitle: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 13,
  },
  hero: {
    alignItems: 'center',
    backgroundColor: '#16a34a',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  heroSubText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 4,
  },
  orderGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  orderItem: {
    alignItems: 'center',
    borderColor: '#e2e8f0',
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 8,
  },
  orderText: {
    color: '#334155',
    fontSize: 11,
  },
  page: {
    backgroundColor: '#f8fafc',
    flex: 1,
  },
  pageContent: {
    gap: 12,
    padding: 12,
    paddingBottom: 24,
  },
  toolRow: {
    paddingVertical: 12,
  },
  toolRowWithBorder: {
    borderTopColor: '#f1f5f9',
    borderTopWidth: 1,
  },
  toolText: {
    color: '#334155',
    fontSize: 14,
  },
})

export default UserCenterPage
