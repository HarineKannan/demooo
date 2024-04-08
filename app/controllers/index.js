import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @action
  selectLogType(logType) {
    console.log("Selected Log Type:", logType);
  }

  async fetchData(url, payload) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log('Operation successful');
      } else {
        throw new Error('Operation failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  @action
  async fetchLogs() {
    const payload = this.generatePayload();
    await this.fetchData('http://localhost:8080/LogFetcher/logFetcher', payload);
  }


  generatePayload() {
    return {
      logtype: this.selectedLogType
    };
  }
}



// import Controller from '@ember/controller';
// import { action } from '@ember/object';

// export default class IndexController extends Controller {

//   logsData = [];

//   @action
//   selectLogType(logType) {
//     console.log("Selected Log Type:", logType);
//   }

//   async fetchData(url, payload) {
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         console.log('Operation successful');
//       } else {
//         throw new Error('Operation failed');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   }

//   // async getData(url, payload) {
//   //   try {
//   //     const response = await fetch(url, {
//   //       method: 'GET',
//   //       headers: {
//   //         'Content-Type': 'application/json'
//   //       },
//   //       body: JSON.stringify(payload)
//   //     });

//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       this.logsData = data;
//   //       console.log('Operation successful');
//   //     } else {
//   //       throw new Error('Operation failed');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error:', error.message);
//   //   }
//   // }

//   @action
//   async fetchLogs() {
//     const payload = this.generatePayload();
//     await this.fetchData('http://localhost:8080/LogFetcher/logFetcher', payload);
//   }


//   generatePayload() {
//     return {
//       logtype: this.selectedLogType
//     };
//   }
  
//   // @action
//   // async searchLogs(query) {
//   //   const payload = {
//   //     query: query
//   //   };
//   //   await this.getData('http://localhost:8080/LogFetcher/logFetcher', payload);
//   // }


// }
