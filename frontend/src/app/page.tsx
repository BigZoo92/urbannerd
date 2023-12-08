'use client';

import Card from './components/Card';
import { PersonIcons } from './components/Icons';
import Loader from './components/Loader';
import { colors } from './constant';
import { useAuthContext } from './provider/AuthProvider';

export default function Home() {
  const { loading } = useAuthContext()

  return loading ? (
    <Loader></Loader>
  ) : (
    <>
      <main>
        <section className="feed">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </section>
      </main>
    </>
  )
}
