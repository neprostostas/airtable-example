$(document).ready(function(){

    // Displays loader while Airtable data is loading
    $('#loader-wrapper').show();

    // Initializes Airtable Personal Access Token
    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: 'patT07mbxa0yLIeSv.e28590d861260e0dc06c81892a360308a5131faa3a45719ac60695ee71221d42'
    });

    // Selects all records in a specific table in your Airtable database
    const base = Airtable.base('appYeNF0Uboa3JCk8');
    base('tblGEv0IO353gvwyv').select({
        view: 'Grid view' // replace with your desired view name
    }).eachPage(function page(records, fetchNextPage) {

        // Hides loader when Airtable data has loaded
        $('#loader-wrapper').hide();

        // Creates a list element to store Airtable data
        const ul = $('<ul>');

        // Iterates over each record to extract fields from Airtable into list items
        records.forEach(function(record, id) {
            const li = $('<li>');

            const recordNumber = id + 1;
            li.html('<strong>' + (recordNumber < 10 ? '0' : '') + recordNumber + ". " + record.get('Heading') + '</strong>: ' + '<p>' + record.get('Text') + '</p>');

            const imagesDiv = $('<div class="images">'); // create a div to hold the images
            if (record.get('Image')) {
                const imgTags = record.get('Image').map(function (image) {
                    const imgTag = $('<img>');
                    imgTag.attr('src', image.url);
                    imgTag.attr('alt', image.id);
                    imgTag.attr('width', '150');
                    imgTag.attr('height', '150');
                    return imgTag[0].outerHTML;
                });
                imagesDiv.append(imgTags.join(''));
                li.append(imagesDiv);
            }

            ul.append(li);
        });

        // Appends the list of Airtable data to the web page
        $('#airtable-data').append(ul);

        // Gets the next page of records if there are more pages to be fetched
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); }
    });

});