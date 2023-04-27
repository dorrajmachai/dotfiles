import java.lang.StringBuilder;

class SqueakyClean {
    static String clean(String identifier) {
        //throw new UnsupportedOperationException("Please implement the (static) SqueakyClean.clean() method");

StringBuilder stringBuilder = new StringBuilder(identifier);

        for (int i = 0; i < identifier.length(); i++) {

            // -- Replace whitespace with underscores - DONE
            if (Character.isWhitespace(stringBuilder.charAt(i))) {
                stringBuilder.setCharAt(i, '_');

            // -- Replace control characters with "CTRL" - DONE
            } else if (Character.isISOControl(stringBuilder.charAt(i))) {
                stringBuilder.replace(i, i + 1, "CTRL");

            // Convert kebab-case to camelCase - DONE
            } else if (stringBuilder.charAt(i) == '-') {
                stringBuilder.setCharAt(stringBuilder.indexOf("-") + 1, 
                                        Character.toUpperCase(stringBuilder.charAt(i + 1)));           
                stringBuilder.setCharAt(i, Character.MIN_VALUE);

            // Omit characters that aren't letters
            } else if (!Character.isLetter(stringBuilder.charAt(i))) {
                stringBuilder.replace(i, i + 1, "\b");
        
            // Omit Greek lowercase letters
            } else if (Character.UnicodeBlock.of(i) == Character.UnicodeBlock.GREEK) {
                stringBuilder.setCharAt(i, Character.MIN_VALUE);
            }
        }

        System.out.println(stringBuilder);
        return stringBuilder.toString();


    }
}
