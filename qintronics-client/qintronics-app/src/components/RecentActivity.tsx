const recentActivities = [
  { activity: "New order #123 placed", time: "10 minutes ago" },
  { activity: "Product 'iPhone 13' updated", time: "30 minutes ago" },
  { activity: "User 'John Doe' signed up", time: "1 hour ago" },
];

const RecentActivity = () => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-medium text-gray-800 mb-4">
        Recent Activity
      </h3>
      <ul className="space-y-4">
        {recentActivities.map((item, index) => (
          <li key={index} className="bg-gray-100 px-4 py-2 rounded-lg shadow">
            <p className="font-medium text-gray-700">{item.activity}</p>
            <p className="text-sm text-gray-500">{item.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
