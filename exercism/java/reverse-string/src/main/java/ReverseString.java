class ReverseString {

    String reverse(String inputString) {
        // throw new UnsupportedOperationException("Delete this statement and write your own implementation.");

        String reversedString = "";

        for (int i = 0; i < inputString.length(); i++) {
            reversedString = inputString.charAt(i) + reversedString;
        }

        return reversedString;
    }
  
}
