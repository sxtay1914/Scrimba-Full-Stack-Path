- Destructure 'search' from req.query

- Use conditional logic to see if 'search' is a truthy value. If it is:
   - Add to the query let with something like this:
        query += ' WHERE abc LIKE ? OR xyz LIKE ? ...'
	- Wrap the search pattern (i.e. inputted search text) in the '%' wildcard to match any sequence of characters.
	- Push the search pattern to the params array as many times as you have placeholders.


Scroll down for spoiler:


























query += ' WHERE name LIKE ? OR address LIKE ? OR town LIKE ?'
const searchPattern = `%${search}%`
params.push(searchPattern, searchPattern, searchPattern)







