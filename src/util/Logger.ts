class Logger {
  public static printHeading(text: string): void {
    const padding = ' '.repeat(2);
    const hrule = '═'.repeat(text.length + padding.length * 2);

    console.log('╔' + hrule + '╗');
    console.log('║' + padding + text + padding + '║');
    console.log('╚' + hrule + '╝');
  }
}

export default Logger;
