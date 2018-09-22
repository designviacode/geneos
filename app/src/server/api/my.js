export default async (req, res) => {
  return res.json({
    data: [
      { id: '1', name: 'Genome', slug: 'genome' },
      { id: '2', name: 'Activity', slug: 'activity' },
      { id: '3', name: 'Heart Rate', slug: 'heart-rate' },
      { id: '4', name: 'Weight', slug: 'weight' },
      { id: '5', name: 'Sleep', slug: 'sleep' }
    ]
  });
};
