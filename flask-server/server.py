from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

@app.route('/book-details/<isbn>', methods=['GET'])
def get_book_details(isbn):
    url = f'https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}&key=#'
    response = requests.get(url)
    
    if response.status_code == 200:
        book_data = response.json()
        if 'items' in book_data and len(book_data['items']) > 0:
            volume_info = book_data['items'][0]['volumeInfo']
            
            title = volume_info.get('title', 'N/A')
            authors = ', '.join(volume_info.get('authors', ['N/A']))
            published_date = volume_info.get('publishedDate', 'N/A')
            description = volume_info.get('description', 'N/A')
            pageCount = volume_info.get('pageCount', 'N/A')
            categories = ', '.join(volume_info.get('categories', ['N/A']))
            thumbnail = volume_info['imageLinks']['thumbnail'] if 'imageLinks' in volume_info else None
            preview_link = volume_info.get('previewLink', 'N/A')
            info_link = volume_info.get('infoLink', 'N/A')
            canonical_link = volume_info.get('canonicalVolumeLink', 'N/A')
            
            return jsonify({
                'title': title,
                'authors': authors,
                'published_date': published_date,
                'description': description,
                'pageCount': pageCount,
                'categories': categories,
                'thumbnail': thumbnail,
                'preview_link': preview_link,
                'info_link': info_link,
                'canonical_link': canonical_link
            })
        else:
            return jsonify({'error': 'Book not found'}), 404
    else:
        return jsonify({'error': 'Failed to fetch book details'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5005)
