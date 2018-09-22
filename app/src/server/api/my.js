
export default async (req, res) => {
  return res.json({
    data: [
      { id: '1', name: 'Heart Rate' },
      { id: '2', name: 'Weight' },
      { id: '3', name: 'Finance' },
    ],
  });
};
