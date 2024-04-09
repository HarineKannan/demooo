import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {

  developers = [{ name: 'Yehuda',age:10 }, { name: 'Tom',age:20 }, { name: 'Paul', age:30 }];

  selectedFieldType = null;
  searchResults = [];

  @action
  selectLogType(logType) {
    console.log('Selected Log Type:', logType);
  }

  @action
setSelectedFieldType(fieldType) {
  console.log('Selected Field Type:', fieldType);
  this.selectedFieldType = fieldType;
}


  async fetchData(url, payload) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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

  async searchData(url, payload) {
    try {
      const searchUrl = new URL(url);
      Object.keys(payload).forEach((key) =>
        searchUrl.searchParams.append(key, payload[key]),
      );

      const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Received data:', data.searchResults);
        this.searchResults = data.searchResults;
        // this.set('searchResults', data.searchResults);
        this.set('searchResults', data.searchResults);
        console.log(this.developers);

        console.log('Search results:', this.searchResults);
        // this.searchResults.forEach(element => {
        //   console.log(element);
        // });

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
    await this.fetchData(
      'http://localhost:8080/LogFetcher/logFetcher',
      payload,
    );
  }

  @action
  async searchLogs() {
    const payload = this.generateSearchPayload();
    await this.searchData(
      'http://localhost:8080/LogFetcher/logFetcher',
      payload,
    );
  }

  @action
  generateSearchPayload() {
    return {
      neededfield: this.selectedFieldType,
      searchquery: document.getElementById('searchQuery').value,
    };
  }

  generatePayload() {
    return {
      logtype: this.selectedLogType,
    };
  }


}
