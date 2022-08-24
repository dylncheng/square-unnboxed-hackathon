import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Landing from '../components/Landing'
import { getCatalog, getStylists } from './api/hello.js' 
import { useEffect } from 'react'

export default function Home({services, employees}) {
  useEffect(() => {
    console.log("hellooo");
  }, []);

  return (
        <div className={styles.container}>
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <Landing services={services} employees={employees}/>
          </main>

          <footer className={styles.footer}>
          </footer>
        </div>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const services = {};
  
  let result = await getCatalog();
  result.objects.forEach(object => {
    if (object.type === 'CATEGORY') {
        services[object.id] = { 
                                        category_services: {
                                        }, 
                                        name: object.categoryData.name
                                    };
    } else {
        services[object.itemData.categoryId].category_services[object.itemData.name] = { 
          id: object.id,
          teamMemberIds: object.itemData.variations[0].itemVariationData.teamMemberIds,
          price: Number(object.itemData.variations[0].itemVariationData.priceMoney.amount) / 100,
          duration: Number(object.itemData.variations[0].itemVariationData.serviceDuration) / 3600000
        };
        //console.log(object.itemData.variations[0].itemVariationData.teamMemberIds);
        //console.log(services);
    }
  });
  console.log("___________________________________");
  console.log(services);

  const employees = {};

  let result_stylist = await getStylists();
  
  result_stylist.teamMemberBookingProfiles.forEach(object => {
    employees[object.teamMemberId] = {
      name: object.displayName,
      description: object.description,
    }
  });
  console.log(employees);


  // Pass data to the page via props
  return { props: { services, employees } }
}