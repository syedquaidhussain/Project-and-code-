

const routes = [
    {
      name: 'M1',
      comp: 'C1',
    },
    {
      name: 'M2',
      comp: 'C2',
    },
    {
      name: 'M3',
      subComp: [
        {
          name: 'M3A',
          comp: 'C3A',
        },
        {
          name: 'M3B',
          comp: 'C3B',
        },
      ],
    },
    {
      name: 'M4',
      subComp: [
        {
          name: 'M4A',
          comp: 'C4A',
        },
        {
          name: 'M4B',
          comp: 'C4B',
        },
      ],
    },
    {
      name: 'M5',
      subComp: [
        {
          name: 'M5A',
          comp: 'C5A',
        },
        {
          name: 'M5B',
          subComp: [
            {
              name: 'M5BA',
              comp: 'C5BA',
            },
            {
              name: 'M5BB',
              comp: 'C5BB',
            },
            {
              name: 'M5BC',
              comp: 'C5BC',
            },
          ],
        },
        {
          name: 'M5C',
          comp: 'C5C',
        },
      ],
    },
  ];
  
  const subscription = [
    {
      name: 'M1',
      isSub: true,
    },
    {
      name: 'M2',
      isSub: false,
    },
    {
      name: 'M3',
      isSub: false,
      subMod: [
        {
          name: 'M3A',
          isSub: true,
        },
        {
          name: 'M3B',
          isSub: true,
        },
      ],
    },
    {
      name: 'M4',
      isSub: true,
      subMod: [
        {
          name: 'M4A',
          isSub: false,
        },
        {
          name: 'M4B',
          isSub: true,
        },
      ],
    },
    {
      name: 'M5',
      isSub: true,
      subMod: [
        {
          name: 'M5A',
          isSub: false,
        },
        {
          name: 'M5B',
          isSub: true,
  
          subComp: [
            {
              name: 'M5BA',
              isSub: false,
            },
            {
              name: 'M5BB',
              isSub: true,
            },
            {
              name: 'M5BC',
              isSub: false,
            },
          ],
        },
        {
          name: 'M5C',
          isSub: true,
        },
      ],
    },
  ];
  
  function transformRoutes(routes, subscriptions) {
  
    const subscriptionMap = {};
  
    
    subscriptions.forEach((sub) => {
  
      subscriptionMap[sub.name] = sub;
    });
  
    let redirectTo = null;
  
    // Recursive function to process each route
    const updateRoute = (route) => {
      const subscription = subscriptionMap[route.name];
  
      if (!subscription || !subscription.isSub) {
        
        if (route.subComp) {
          route.subComp = route.subComp.map((subRoute) => ({
            name: subRoute.name,
            comp: 'UN',
          }));
        } else {
          route.comp = 'UN';
        }
      } else if (route.subComp && subscription.subMod) {
        
        const subModMap = {};
  
        subscription.subMod.forEach((sub) => {
  
          subModMap[sub.name] = sub;
        });
  
        route.subComp = route.subComp.map((subRoute) => {
          const subSubscription = subModMap[subRoute.name];
          return updateRoute({ ...subRoute, ...(subSubscription || { isSub: false }) });
        });
      }
  
  
      // Set the redirectTo for the first subscribed module
      if (!redirectTo && subscription && subscription.isSub) {
        redirectTo = route.name;
      }
  
      return route;
    };
  
    // Transforming routes
  
    const updatedRoutes = routes.map(updateRoute);
  
    // Add redirectTo at the beginning
    updatedRoutes.unshift({ redirectTo });
  
    const cleanup = (obj) => {
      delete obj.isSub;
      if (obj.subComp) {
        obj.subComp.forEach(cleanup);
      }
    };
    updatedRoutes.forEach(cleanup);
  
    return updatedRoutes;
  }
  
  const transformedRoutes = transformRoutes(routes, subscription);
  console.log(JSON.stringify(transformedRoutes, null, 2));
  