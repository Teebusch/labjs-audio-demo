// Script for storing the entire data
// 
// This is not strictly necessary, since lab.js stored the data 
// autmamatially. Theis adds a bit of convenience.
//
// This script must be added to the "after:end" stage.

// ***** Configuration ********************************************
// save the labjs csv data file to JATOS?
// This creates a bit of data duplication because the data is 
// already saved on JATOS in json format. Saving it as csv adds 
// a bit of convenience at the expense of using more storage.
// Leaving it set to `true` is fine, regardless of whether the 
// experiment is running on JATOS or not.
save_to_jatos = true;

// Initiate download of data as 'CSV' file after the experiment?
// (This is about the user's browser. The data will be stored by 
// lab.js regardless)
download_csv = true; 
// ****************************************************************


if (save_to_jatos) {
  const blob = this.options.datastore.exportBlob(filetype = 'csv');
    
  try{
    filename = "data.csv";
    jatos.uploadResultFile(blob, filename).done(() => { 
      info = info.concat(`CSV uploaded to JATOS as ${ filename }.`);
    });
  } catch (err) {
    "Upload to JATOS failed. "
  }
}


if (download_csv) this.options.datastore.download();