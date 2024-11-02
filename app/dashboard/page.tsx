import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Music, Users, Clock, BarChart2 } from "lucide-react";
import ActionButton from "./ButtonAction";

export default function DashboardComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-indigo-200 dark:from-purple-900 dark:to-indigo-900 transition-colors duration-300">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">
                Total Streams
              </CardTitle>
              <Music className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                254
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">
                Total Listeners
              </CardTitle>
              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                1,234
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                +18% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">
                Listening Time
              </CardTitle>
              <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                450h
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                +5% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">
                Top Genre
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                Pop
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                32% of total streams
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6 text-purple-900 dark:text-purple-100">
          Recent Streams
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-purple-100 dark:bg-purple-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-900 dark:text-purple-100 uppercase tracking-wider">
                  Stream Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-900 dark:text-purple-100 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-900 dark:text-purple-100 uppercase tracking-wider">
                  Listeners
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-900 dark:text-purple-100 uppercase tracking-wider">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-200 dark:divide-purple-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-purple-900 dark:text-purple-100">
                  Summer Vibes Mix
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-purple-900 dark:text-purple-100">
                  2023-07-15
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-purple-900 dark:text-purple-100">
                  89
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-purple-900 dark:text-purple-100">
                  2h 30m
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-purple-900 dark:text-purple-100">
                  Chill Lofi Beats
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-purple-900 dark:text-purple-100">
                  2023-07-12
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-purple-900 dark:text-purple-100">
                  124
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-purple-900 dark:text-purple-100">
                  3h 15m
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-purple-900 dark:text-purple-100">
                  Rock Classics
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-purple-900 dark:text-purple-100">
                  2023-07-10
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-purple-900 dark:text-purple-100">
                  76
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-purple-900 dark:text-purple-100">
                  1h 45m
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <ActionButton />
        </div>
      </main>
    </div>
  );
}
